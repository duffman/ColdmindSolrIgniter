/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */

export interface IQuerySegment {
	name: string;
	toString(): string;
}

class QuerySegment implements IQuerySegment {
	constructor(public name: string, value: string) {}
}

class RangeSegment {
	constructor(public name: string, value: string) {}

	public toString() {}
}

export class SolrQueryBuilder {
	segments: IQuerySegment[];

	constructor() {
		this.segments = new Array<IQuerySegment>();
	}

	public appendSegment(name: string, value: string) {
		this.segments.push(
			new QuerySegment(name, value)
		);
	}

	public toString(): string {
		let result: string = "";

		for (let segment of this.segments) {

		}

		return result;
	}
}
