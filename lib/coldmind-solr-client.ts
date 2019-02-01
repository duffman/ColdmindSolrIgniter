/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */

import { SolrSearchResult, ISolrSearchResult } from "@lib/core/solr-search-result";
import { SolrRequest } from "@lib/core/solr-request";

export interface IColdmindSolrClient {
	collection: string;
	use(collection: string): void;
}

export class ColdmindSolrClient implements IColdmindSolrClient {
	collection: string;

	constructor() {}

	public use(collection: string): void {
		this.collection = collection;s
	}

	public query(query: string): ISolrSearchResult {
		let solrRequest = new SolrRequest();
		solrRequest.postData("")
	}
}
