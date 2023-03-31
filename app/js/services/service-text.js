export default function dateFormat(timestamp) {
	const date = new Date(timestamp)

	function formatElementDate(type) {
		switch (type) {
			case "Date":
			case "Hours":
			case "Minutes":
				return date[`get${type}`]() < 10 ? `0${date[`get${type}`]()}` : `${date[`get${type}`]()}`
			case "Month":
				return date[`get${type}`]() < 10 ? `0${date[`get${type}`]() + 1}` : `${date[`get${type}`]() + 1}`
			case "Year":
				return `${date.getFullYear().toString()[2]}${date.getFullYear().toString()[3]}`
			default:
				return false
		}
	}

	const day = formatElementDate("Date")
	const month = formatElementDate("Month")
	const year = formatElementDate("Year")
	const hours = formatElementDate("Hours")
	const minutes = formatElementDate("Minutes")

	return `${hours}:${minutes} ${day}.${month}.${year} `
}

export function longTextFormat(text) {
	return text.length > 15 ? `${text.substr(0, 15)}...` : text
}
