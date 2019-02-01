/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */

export class StringUtils {
	/**
	 * Returns the last character of a given string
	 * @param value
	 */
	public static getLastChar(value: string): string {
		let result: string = "";

		if (value && value.length > 0) {
			result = result[result.length-1];
		}

		return result;
	}
}
