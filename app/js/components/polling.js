import dateFormat, { longTextFormat } from "../services/service-text"
import storePolling from "../modules/store"

export default class Polling {
	constructor(parrentElement) {
		this.parrentDomEl = document.querySelector(parrentElement)
	}

	init() {
		this.pollingListDomEl = document.createElement("ul")
		this.pollingListDomEl.classList.add("polling-list")

		this.parrentDomEl.appendChild(this.pollingListDomEl)

		storePolling(this.createPollingItem.bind(this))

		setInterval(() => {
			storePolling(this.createPollingItem.bind(this))
		}, 5000)
	}

	createPollingItem({ from, subject, received }) {
		const pollingItemDomEl = document.createElement("li")
		pollingItemDomEl.classList.add("polling-list__item")

		pollingItemDomEl.innerHTML = `
            <p class="polling-list__item-email">${longTextFormat(from)}</p>
            <p class="polling-list__item-text">${longTextFormat(subject)}</p>
            <p class="polling-list__item-date">${dateFormat(received)}</p>
        `

		this.pollingListDomEl.insertAdjacentElement("afterbegin", pollingItemDomEl)
	}
}
