/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
import { SolrClient }             from '@lib/solr-client';
import { ISuggestResp }           from '../models/suggest-response';

export class SolrSuggest {
	constructor() {}

	public suggest(collection: string, value: string): Promise<ISuggestResp<any>> {
		value = encodeURIComponent(value);

		let client = new SolrClient();
		client.use(collection);

		let url = client.compileUrl();
		url = url + "suggest?suggest=true&suggest.build=true&"
			+ "suggest.dictionary=infixSuggester&wt=json&suggest.q=" + value;

		return new Promise((resolve, reject) => {
			client.executeUrl(url).then(jsonData => {
				console.log("DATA ::", jsonData);
				let res = JSON.parse(jsonData) as ISuggestResp<any>;

				console.log("RES ::", res);

				resolve(res);
				/*
				if (doc.response.numFound < 1) {
					console.log("No hits");
					return;
				}

				for (let res of doc.response.docs) {
					console.log("DOC ::", res);
				}
				*/

			}).catch(err => {
				console.log("ERR ::", err);
				reject(err);
			});
		});
	}
}
