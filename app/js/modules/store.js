import { Observable, from, pluck } from "rxjs"

function getRequest(url) {
	return new Observable(observer => {
		const controller = new AbortController()

		fetch(url, {
			signal: controller.signal
		})
			.then(res => res.json())
			.then(data => {
				observer.next(data)
				observer.complete()
			})
			.catch(err => observer.error(err))

		return () => controller.abort()
	})
}

// getRequest("http://localhost:7070/messages/unread").pipe(
// 	pluck("messages"),
// 	catchError(err => {
// 		console.log(err)

// 		return []
// 	})
// )

export default function storePolling(observer) {
	const stream$ = from([
		{
			status: "ok",
			timestamp: 1553400000,
			messages: [
				{
					id: "<uuid>",
					from: "anya@ivanova",
					subject: "Hello from Anya",
					body: "Long message body here",
					received: 1553108200
				},
				{
					id: "<uuid>",
					from: "design.public@dnd-projects.ru",
					subject: "Hello from Alex Petrov!",
					body: "Long message body here",
					received: 1553107200
				}
			]
		},
		{
			status: "ok",
			timestamp: 1553400000,
			messages: [
				{
					id: "<uuid>",
					from: "dev.public@dnd-projects.ru",
					subject: "Hello from Alice Pupkin",
					body: "Long message body here",
					received: 1553107200
				}
			]
		}
	]).pipe(pluck("messages"))

	stream$.subscribe(value => {
		value.forEach(message => {
			observer(message)
		})
	})
}
