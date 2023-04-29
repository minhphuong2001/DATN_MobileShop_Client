export const TimeFormate = (time: string) => {
	const date = new Date(Date.parse(time));

	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return `${day}-${month}-${year}`;
}