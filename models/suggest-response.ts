/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

export interface ISuggestResp<T> {
	responseHeader: ResponseHeader;
	command:        string;
	suggest:        T;
}

export interface ResponseHeader {
	status: number;
	QTime:  number;
}

export interface Suggest {
}

// Converts JSON strings to/from your types
export namespace Convert {
	export function toISuggestResp(json: string): ISuggestResp<any> {
		return JSON.parse(json);
	}

	export function iSuggestRespToJson(value: ISuggestResp<any>): string {
		return JSON.stringify(value);
	}
}
