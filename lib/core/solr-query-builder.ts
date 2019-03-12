/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */

import { ISolrQuery, SolrQuery } from "@lib/core/query/solr-query";
import { Const } from "@lib/const";

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

export interface ISolrQueryBuilder {
	all(): ISolrQuery;
}

export class SolrQueryBuilder implements ISolrQueryBuilder {
	segments: IQuerySegment[];

	constructor() {
		this.segments = new Array<IQuerySegment>();
	}

	public all(): ISolrQuery {
		return null;
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
