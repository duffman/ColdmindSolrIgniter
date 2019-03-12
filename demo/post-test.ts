/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * March 2019
 */

import * as request from "request";

var rp = require('request-promise');


//require('request').debug = true;

export class PostTest {
	baseRequest: request;

	constructor() {
		this.baseRequest = request.defaults({
			"baseUrl": "http://localhost:8983/solr/zap/",
			'headers': {
				"content-type": "application/json",
				"user-agent": "coldmind-solr",
				"connection": "keep-alive"
			},
			'gzip': false,
			'json': true
		});
	}

	public execute(data: any) {
		this.baseRequest.post("update", data, (err, httpResponse, body) => {
			if (err)
				console.log("ERR ::", err);

			console.log("BODY ::", body);
		});
	}

	public executePost(method: string, data: any): Promise<any> {
		return new Promise((resolve, reject) => {
			this.baseRequest.post(method, data, (err, httpResponse, data) => {
				if (err) {
					reject(err);
					console.log("ERR ::", err);
					return;
				}

				console.log("DATA ::", data);
				resolve(data);
			});
		});
	}

	public cpTest() {

		var options = {
			"method": 'POST',
			"uri": 'http://localhost:8983/solr/zap/select',
			"content-type": "application/x-www-form-urlencoded",
			"body": {
				some: 'payload'
			},
			json: true // Automatically stringifies the body to JSON
		};

		rp(options).then((parsedBody) => {
			// POST succeeded...
			console.log("RES ::", parsedBody);
		})
		.catch(function (err) {
			// POST failed...
			console.log("ERR ::", err);
		});


	}

}

let test = new PostTest();
//test.execute(`<delete><query>*:*</query></delete>`);


test.executePost("select", `*:*`).then(res => {
	console.log("Execute Post ::", res);

}).catch(err => {
	console.log("Execute Post :: ERR ::", err);
});









