/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * March 2019
 */

//TODO: MERGE RESP HEADERS WITH SEARCH RESPONSE

export interface IResponseHeader {
	responseHeader?: IResponseHeaderClass;
	error?:          IResponseError;
}

export interface IResponseError {
	metadata?: string[];
	msg?:      string;
	code?:     number;
}

export interface IResponseHeaderClass {
	status?: number;
	QTime?:  number;
}

/** Class Implementations **/

export class ResponseHeader implements IResponseHeader {
	constructor (
		public responseHeader: IResponseHeaderClass = new ResponseHeaderClass(),
		public error: IResponseError = new ResponseError()
	) {}
}

export class ResponseError implements IResponseError {
	constructor(
		public metadata: string[] = [],
		public msg: string = "",
		public code: number = -1
	) {}
}

export class ResponseHeaderClass implements IResponseHeaderClass {
	constructor (
		public status: number = -1,
		public QTime: number = 0
	) {}
}


/** Converts JSON strings to/from your types **/

export namespace RespHeaderFactory {
	export function createError(msg: string, code: number): IResponseHeader {
		let result = new ResponseHeader(
			new ResponseHeaderClass(-100),
			new ResponseError([], msg, code)
		);

		return result;
	}

	export function toResponseHeader(json: string): IResponseHeader {
		return JSON.parse(json);
	}

	export function responseHeaderToJson(value: IResponseHeader): string {
		return JSON.stringify(value);
	}
}
