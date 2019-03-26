/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import {SolrClient} from '@lib/solr-client';
import {ISolrResponse} from '../models/solr-response';

export class SolrSelect<T> {
	constructor() {}

	public select(collection: string, query: string): Promise<ISolrResponse<T>> {
		let client = new SolrClient();
		client.use(collection);

		let url = client.compileUrl() + query;

		return new Promise((resolve, reject) => {
			client.executeUrl(url).then(jsonData => {
				console.log("DATA ::", jsonData);
				let res = JSON.parse(jsonData) as ISolrResponse<T>;

				resolve(res);

			}).catch(err => {
				console.log("ERR ::", err);
				reject(err);
			});
		});
	}
}
