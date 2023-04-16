export function MoneyFormat(money: number | string) {
	if (money !== 0 && !money) {
			return "0₫";
	} else if (typeof money === "number") {
			return money
					.toString()
					.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
					.concat("₫");
	} else if (typeof money === "string") {
			return money.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.").concat(" ₫");
	} else return "0₫";
}

export function MoneyFormatNoSymbol(money: number | string) {
	if (money === "" || money === "0") {
			return money;
	} else if (typeof money === "number") {
			return money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	} else if (typeof money === "string") {
			return money.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	} else {
			return "";
	}
}

export function MathRoundNumber(value: number, roundNumber: number) {
	return Math.round(value * Math.pow(10, roundNumber)) / Math.pow(10, roundNumber)
}