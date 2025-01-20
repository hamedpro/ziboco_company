import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment-jalaali";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const digitMapping: [string, string][] = [
	["0", "۰"],
	["1", "۱"],
	["2", "۲"],
	["3", "۳"],
	["4", "۴"],
	["5", "۵"],
	["6", "۶"],
	["7", "۷"],
	["8", "۸"],
	["9", "۹"],
];

const englishDigits = digitMapping.map(([english, persian]) => english);
const persianDigits = digitMapping.map(([english, persian]) => persian);

export function convertToEnglish(digit: string): string {
	if (englishDigits.includes(digit)) return digit;

	for (const [english, persian] of digitMapping) {
		if (persian === digit) {
			return english;
		}
	}
	return "";
}

export function convertToPersian(digit: string): string {
	if (persianDigits.includes(digit)) return digit;

	for (const [english, persian] of digitMapping) {
		if (english === digit) {
			return persian;
		}
	}
	return "";
}

export function validatePhoneNumber(phoneNumber: string): boolean {
	// Check if the phone number is exactly 11 digits long and starts with "09"
	return phoneNumber.length === 11 && phoneNumber.startsWith("09") && /^\d+$/.test(phoneNumber);
}
export function createUrlFromOriginWithPort(port: number): string {
	const origin = window.location.origin; // Get the current origin
	const url = new URL(origin); // Create a URL object from the origin
	url.port = port.toString(); // Set the port to the specified port
	return url.href; // Return the full URL as a string
}

export const getPersianValue = (value: string): string => {
	let persianValue = "";
	for (let char of value) {
		persianValue += convertToPersian(char);
	}
	return persianValue;
};
export const getEnglishValue = (value: string): string => {
	let englishValue = "";
	for (let char of value) {
		englishValue += convertToEnglish(char);
	}
	return englishValue;
};

export function generateRange(max: number): number[] {
	if (typeof max !== "number" || max <= 0 || !Number.isInteger(max)) {
		throw new Error("Invalid input: max must be a positive integer.");
	}

	return Array.from({ length: max }, (_, index) => index);
}

export function waitForSeconds(x: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, x * 1000); // Convert seconds to milliseconds
	});
}
export function formatDateTo12HourTime(date: Date): string {
	let hours: number = date.getHours();
	const minutes: number = date.getMinutes();

	// Determine AM or PM suffix
	const ampm: string = hours >= 12 ? "PM" : "AM";

	// Convert to 12-hour format
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'

	// Format minutes to always be two digits
	const formattedMinutes: string = minutes < 10 ? "0" + minutes : minutes.toString();

	return `${hours}:${formattedMinutes} ${ampm}`;
}

export function setJwtCookie(token: string, cookieName: string, expInHours: number): void {
	const cookieValue = token; // The JWT token
	const expires = new Date();
	expires.setHours(expires.getHours() + expInHours); // Set cookie to expire in specified hours

	// Set the cookie with options
	let newCookie = `${cookieName}=${cookieValue}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict;`;
	console.log(newCookie);
	document.cookie = newCookie;
}
export const authLayoutColors = [
	"#1c1c1c",
	"#ede9bc",
	"#e5e3e4",
	"#58534d",
	"#81807c",
];

type TranslationDictionary = { [key: string]: string };

/**
 * Translates a key to its corresponding value from a dictionary.
 * If the key is missing, it returns the default fallback.
 *
 * @param dictionary - The mapping object with keys and their translations
 * @param key - The key to translate
 * @param fallback - The value to return if the key is not found (default: "Translation not found")
 * @returns The translated value or the fallback
 */
export function translateValue(
	dictionary: TranslationDictionary,
	key: string,
	fallback: string = "Translation not found"
): string {
	return dictionary[key] || fallback;
}

export function getPersianDate(date: Date): string {
	const persianDate = moment(date).format("jYYYY-jMM-jDD"); // Persian date format
	return persianDate.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]); // Convert to Persian digits
}