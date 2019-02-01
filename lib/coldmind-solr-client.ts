/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */

import { ISolrSearchResult }      from "@lib/core/solr-search-result";
import { SolrSearchResult }       from "@lib/core/solr-search-result";
import { SolrHttpRequest }            from "@lib/core/solr-http-request";
import { ISolrQueryResult }       from "@lib/core/solr-query-result";
import { ServerProtocol, SolrRequestHandler }         from "@lib/types";
import { Constants } from "@lib/const";
import { Log } from "@lib/utils/logger";
import { Convert } from "@lib/doc-parser";
import { Encoding } from "@lib/utils/encoding";

export interface IColdmindSolrClient {
	collection: string;
	use(collection: string): void;
}

export class QueryRecord {
	constructor(public name: string, public value: any) {}
}

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
			let rec: QueryRecord = this.records;
			reqStr += rec.name + "=" + Encoding.encodeUriComponent(rec.value);

			if (i + 1 < this.records.length) {
				reqStr += "&";
			}
		}

		return reqStr;
	}
}

export class ColdmindSolrClient implements IColdmindSolrClient {
	collection: string;

	constructor(public protocol: ServerProtocol,
				public host: string,
				public port: number) {}

	public use(collection: string): void {
		this.collection = collection;
	}

	private compileUrl(): string {
		return this.protocol + this.host + ":" + this.port + Constants.URL_SLASH;
	}

	public execute(query: SolrTransaction): Promise<ISolrQueryResult> {
		//http://localhost:8983/solr/techproducts/select?q=*:*&start=5
		let url = this.compileUrl();
		let solrRequest = new SolrHttpRequest();

		// DEBUG
		url = url + "solr/" + this.collection + Constants.URL_SLASH; // techproducts/select?q=*:*&start=5";

		console.log("URL ::", url);

		return new Promise((resolve, reject) => {
			let requestStr = query.compile();

			solrRequest.postData(url, null, false).then(res => {
				Log.info("execute :: ", res);

				let data = Convert.toDoc(res);
				console.log("DATA ::", data);

			}).catch(err => {
				Log.error(this.constructor.name + " :: execute :: ", err);
			});
		});

	}

	public query(collection: string): SolrTransaction {
		let solrQuery = new SolrTransaction(SolrRequestHandler.Select);
		this.collection = collection;

		return solrQuery;
	}
}
