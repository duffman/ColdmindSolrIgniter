/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import * as http from "http";
import { SolrClient }             from "@lib/solr-client";
import { ServerProtocol }         from "@lib/types";
import { Const }                  from "@lib/const";
import { Doc, IDoc, Convert }     from "@lib/doc-parser";
import { SolrHttpRequest }        from "@lib/core/solr-http-request";
import { Log }                    from "@lib/utils/logger";
import { ISolrResponse }           from '../models/solr-response';

/*
http://localhost:8983/solr/topzap/suggest?suggest.build=true&suggest.dictionary=fuzzySuggester
http://localhost:8983/solr/topzap/suggest?suggest.build=true&suggest.dictionary=infixSuggester
*/

export class SolrOperations {

	constructor(public solrClient: SolrClient = null) {
		solrClient = (solrClient === null) ? new SolrClient() : solrClient;
	}

	public rebuild(suggesterNames: string[]): Promise<boolean> {
		let url = this.solrClient.compileUrl()
				+ "solr/topzap/suggest?suggest.build=true&suggest.dictionary=infixSuggester";

		return new Promise((resolve, reject) => {
			this.solrClient.executeUrl(url).then(res => {
				let obj = JSON.parse(res) as ISolrResponse<any>;
				let success = (obj.responseHeader.status === 0);
				resolve(success);

			}).catch(err => {
				reject(err);
			});
		});
	}
}

let app = new SolrOperations();
app.rebuild(["infixSuggester"]);