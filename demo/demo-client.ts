/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */

import { ColdmindSolrClient } from "@lib/coldmind-solr-client";
import { ServerProtocol } from "@lib/types";
import { Constants } from "@lib/const";
import { Doc, IDoc, Convert } from "@lib/doc-parser";
import { SolrHttpRequest } from "@lib/core/solr-http-request";
import { Log } from "@lib/utils/logger";

export class DemoClient {
	solrClient: ColdmindSolrClient;

	constructor() {
		this.solrClient = new ColdmindSolrClient(ServerProtocol.HTTP, Constants.LOCALHOST, 8983);
	}

	public searchTechProducts() {
		this.solrClient.use("techproducts");

		let query = this.solrClient.query("*");
		this.solrClient.execute(query).then(res => {
			console.log("Res ::", res);
		}).catch(err => {
			console.log("Err ::", err);
		});
	}
	/*
	 public id: string,
	 public cat: string[],
	 public name: string,
	 public price: number,
	 public price_c: string,
	 public inStock: boolean,
	 public author: string,
	 public author_s: string,
	 public series_t: string,
	 public sequence_i: number,
	 public genre_s: string*/

	public addItems() {
		let req = new SolrHttpRequest();
		let items = new Array<IDoc>();

		let item: Doc = new Doc("id1", ["cat1"], "name1", 1);
		items.push(item);

		item = new Doc("id2", ["cat2"], "name2", 0);
		items.push(item);


		let data = Convert.docToJson(items);
		console.log("DATA ::", data);

		req.postData("http://localhost:8983/solr/techproducts/update", data, false).then(res => {
			Log.info("addItems :: ", res);


		}).catch(err => {
			Log.error(this.constructor.name + " :: execute :: ", err);
		});

	}

}

let client = new DemoClient();
//client.searchTechProducts();
client.addItems();