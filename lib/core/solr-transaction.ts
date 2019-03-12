/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * March 2019
 */

import { Encoding }               from "@lib/utils/encoding";
import { SolrRequestHandler }     from "@lib/types";
import { QueryRecord }            from "@lib/core/query/query-record";

export class SolrTransaction {
	records: QueryRecord[];

	constructor(public qt: SolrRequestHandler) {
		this.records = new Array<QueryRecord>();
	}

	public query(value: number): SolrTransaction {
		this.records.push(new QueryRecord("q", value));
		return this;
	}

	public rows(value: number): SolrTransaction {
		this.records.push(new QueryRecord("rows", value));
		return this;
	}

	public addItems(items: any[]): SolrTransaction {
		return this;
	}

	public compile(): string {
		let reqStr: string = this.qt;

		for (let i = 0; i < this.records.length; i++) {
			let rec: QueryRecord = this.records[i];
			reqStr += rec.name + "=" + Encoding.encodeUriComponent(rec.value);

			if (i + 1 < this.records.length) {
				reqStr += "&";
			}
		}

		return reqStr;
	}
}
