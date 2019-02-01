/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */

import { ColdmindSolrClient } from "@lib/coldmind-solr-client";

export class DemoClient {
	solrClient: ColdmindSolrClient;

	constructor() {
		this.solrClient = new ColdmindSolrClient(8983);
	}

	public searchTechProducts() {
		this.solrClient.use("techproducts");

		this.solrClient.then(res => {
			console.log("Res ::", res);
		}).catch(err => {
			console.log("Err ::", err);
		});
	}
}

let client = new DemoClient();
client.searchTechProducts();
