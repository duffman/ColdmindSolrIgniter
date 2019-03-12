/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */

import { SolrHttpRequest }        from "@lib/core/solr-http-request";
import { ISolrQueryResult }       from "@lib/core/solr-query-result";
import { SolrRequestHandler }     from "@lib/types";
import { ServerProtocol }         from "@lib/types";
import { Const }                  from "@lib/const";
import { Log }                    from "@lib/utils/logger";
import { Convert }                from "@lib/doc-parser";
import { Encoding }               from "@lib/utils/encoding";
import { SolrTransaction }        from "@lib/core/solr-transaction";

export interface IColdmindSolrClient {
	collection: string;
	use(collection: string): void;
}

export class SolrClient implements IColdmindSolrClient {
	collection: string;

	constructor(public protocol: ServerProtocol = ServerProtocol.HTTP,
				public host: string = Const.LOCALHOST,
				public port: number = Const.DEFAULT_PORT) {}

	public use(collection: string): void {
		console.log("USE COLLECTION ::", collection);
		this.collection = collection;
	}

	private compileUrl(): string {
		return this.protocol + this.host + ":" + this.port + Const.URL_SLASH;
	}

	public showDebug(): void {
		let url = this.compileUrl();
		Log.debug(`---------------- ${url}`);
	}


	public executeUrl(url: string): Promise<ISolrQueryResult> {
		let solrRequest = new SolrHttpRequest();

		return new Promise((resolve, reject) => {
			solrRequest.postData(url, null, false).then(res => {
				console.log("DATA ::", res);
			}).catch(err => {
				Log.error(this.constructor.name + " :: execute :: ", err);
				reject(err);
			});
		});
	}

	public execute(transaction: SolrTransaction): Promise<ISolrQueryResult> {
		//http://localhost:8983/solr/techproducts/select?q=*:*&start=5
		let url = this.compileUrl();

		console.log("URL after Compile ::", url);

		let solrRequest = new SolrHttpRequest();

		// DEBUG
		url = url + "solr/" + this.collection + Const.URL_SLASH; // techproducts/select?q=*:*&start=5";

		console.log("Collection SET AS ::", this.collection);
		console.log(">>> URL ::", url);

		return new Promise((resolve, reject) => {
			let requestStr = transaction.compile();

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
