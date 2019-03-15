/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * March 2019
 */

import * as request               from "request";
import { IResponseHeader }        from "../models/response-header";
import { RespHeaderFactory }      from "../models/response-header";

export interface ISolrSearch {
}

export class SolrDelete implements ISolrSearch {
	constructor() {}

	/**
	 * Clear all data from the index
	 */
	public clearIndex(): Promise<IResponseHeader> {
		let options = { method: 'POST',
			url: 'http://localhost:8983/solr/zap/update',
			qs: {
				wt: 'json',
				commitWithin: '1000',
				overwrite: 'true',
				commit: 'true'
			},
			headers: {
				'cache-control': 'no-cache',
				'Content-Type': 'application/xml,text/xml'
			},
			body: '<delete><query>*:*</query></delete>'
		};

		return new Promise((resolve, reject) => {
			//		request(baseUrl, { json: false }, (err, res, data) => {
			request(options, (error, response, data) => {
				if (error) {
					reject(error);
				} else {
					let result: IResponseHeader;

					try {
						result = RespHeaderFactory.toResponseHeader(data);
					} catch (e) {
						result = RespHeaderFactory.createError(JSON.stringify(e), -200);
					}
				}
			});
		});
	}
}

let app = new SolrDelete();
app.clearIndex();
