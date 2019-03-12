/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */

import { Const }              from "@lib/const";
import { StringUtils }            from "@lib/utils/string-utils";

export class UrlUtils {
	/**
	 * Ensures that the given string contains a trailing slash
	 * @param value
	 * @returns {string}
	 */
	public static ensureTrailingSlash(value: string): string {
		if (StringUtils.getLastChar(value) !== Const.URL_SLASH) {
			value = value + Const.URL_SLASH;
		}

		return value;
	}
}
