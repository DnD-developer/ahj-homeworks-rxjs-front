import { catchError, pluck } from "rxjs"
import { ajax } from "rxjs/ajax"

export default function storePolling(observer) {
	const stream$ = ajax.getJSON("http://localhost:3000/messages/unread").pipe(
		pluck("messages"),
		catchError(err => {
			console.log(err)

			return []
		})
	)

	stream$.subscribe(value => {
		value.forEach(message => {
			observer(message)
		})
	})
}
