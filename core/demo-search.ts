/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * March 2019
 */

import * as request from "request";
import { ResponseDataFactory, ISearchResponse } from "../models/search-response";
import { IResponseHeader, RespHeaderFactory } from "../models/response-header";

export class SolrSearch {
	constructor() {}

	public search(query: string): Promise<ISearchResponse> {
		let baseUrl = "http://localhost:8983/solr/zap/select?q=*:*";

		return new Promise((resolve, reject) => {
			request(baseUrl, { json: false }, (err, res, data) => {
				if (err) {
					reject(err);
				} else {
					let result: IResponseHeader;

					try {
						result = RespHeaderFactory.toResponseHeader(data);
					} catch (e) {
						result = RespHeaderFactory.createError(JSON.stringify(e), -200);
					}

					resolve(data);
				}
			});
		});
	}
}

let app = new SolrSearch();

app.search("").then(data => {


	 console.log("DATA ::", data);

	/*
	console.log("responseHeader ::", data.responseHeader);
	console.log("IResponse ::", data.response);
	console.log("RES ::", JSON.stringify(data));
	*/

//	let response = ResponseDataFactory.toSearchResponse(data);
//	let jsonData = JSON.stringify(response);

/*
	console.log("Num Found ::", response.response.numFound);

	for (let doc of response.response.docs) {
		console.log("DOC ::", doc);
	}

	console.dir(response, {depth: null, colors: true})
*/

}).catch(err => {
	console.log("ERR ::", err);

});











/*
import * as SolrNode  from "solr-node";

// Create client
const client = new SolrNode({
	host: '127.0.0.1',
	port: '8983',
	core: 'zap',
	protocol: 'http'
});
*/

/*/ Lucene query
let query2 = client.createQuery()
	.q({title_t : 'Sonic'})
	.start(0)
	.rows(10);

client.search(query2).then(res => {
	console.log("RES ::", res);

}).catch(err => {
	console.log("ERR ::", err);
});
*/