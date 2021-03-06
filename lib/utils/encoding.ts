/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */

import * as querystring from "querystring";

export class Encoding {
	public static encodeUriComponent(value: string) {
		let result: string = "";

		if (value) {
			result = querystring.escape(value);
		}

		return result;
	}
}