/**
 * Interface for a date object, including year, month, and day.
 */
interface IDate {
	year: number;
	month: number;
	day: number;
}

/**
 * Fixes the monthly date by converting a 0-indexed month (from Date.getMonth())
 * to a 1-indexed month (1 for January, 12 for December).
 *
 * @param month - The 0-indexed month (0-11) to be fixed.
 * @returns The 1-indexed monthly date (1-12).
 */
function fixMonthlyDate(month: number): number {
	return month + 1;
}

/**
 * Returns today's date as an IDate object.
 *
 * @returns An IDate object representing the current date.
 */
function todayDate(): IDate {
	const today = new Date();
	const year = today.getFullYear();
	const month = fixMonthlyDate(today.getMonth());
	const day = today.getDate();
	return { year, month, day };
}

/**
 * Returns tomorrow's date as an IDate object.
 * Automatically handles month and year rollovers.
 *
 * @returns An IDate object representing tomorrow's date.
 */
function tomorrowDate(): IDate {
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);

	const year = tomorrow.getFullYear();
	const month = fixMonthlyDate(tomorrow.getMonth());
	const day = tomorrow.getDate();

	return { year, month, day };
}

export { fixMonthlyDate, todayDate, tomorrowDate };
