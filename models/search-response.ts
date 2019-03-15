/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * March 2019
 */

/*
export interface Doc {
	id?:           string;
	full_name?:    string[];
	_version_?:    number;
	barcode?:      string;
	platform?:     string;
	release_date?: string;
}

 */

//TODO: MERGE RESP HEADERS WITH RESPONSE HEADER

export interface ISearchResponse {
	responseHeader?: IResponseHeader;
	response?:       IResponse;
}

export interface IResponse {
	numFound?: number;
	start?:    number;
	docs?:     any[];
}

export interface IResponseHeader {
	status?: number;
	QTime?:  number;
	params?: IParams;
}

export interface IParams {
	q?: string;
}

/** Class Implementation **/

export class SearchResponse implements ISearchResponse {
	constructor(
		public responseHeader: IResponseHeader,
		public response: IResponse
	) {}
}

export class Response implements IResponse {
	constructor(
		public numFound: number,
		public start: number,
		public docs: any[]
	) {}
}

export class ResponseHeader implements IResponseHeader {
	constructor (
		public status: number = -1,
		public QTime: number = 0,
		public params: IParams = null
	) {}
}

export class Params implements IParams {
	constructor(
		public q: string = ""
	) {}
}

/** Factory **/

export namespace ResponseDataFactory {
	export function createResponse(json: string): ISearchResponse {
		return new SearchResponse(
			new ResponseHeader(),
			new Response(0, 0, [])
		);
	}

	export function toSearchResponse(json: string): ISearchResponse {
		return JSON.parse(json);
	}

	export function searchResponseToJson(value: ISearchResponse): string {
		return JSON.stringify(value);
	}
}
