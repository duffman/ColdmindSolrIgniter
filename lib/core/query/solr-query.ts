/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * March 2019
 */

export class SolrQueryRec {

}

export class SolrQuery {
	records: SolrQueryRec[];

	constructor() {
		this.records = new Array<SolrQueryRec>();
	}

	public get(field: string): SolrQuery {
		return this;
	}

	public range(from: string, to: string): SolrQuery {
		return this;
	}
}