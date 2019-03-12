"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * March 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const response_header_1 = require("../models/response-header");
class SolrDelete {
    constructor() { }
    /**
     * Clear all data from the index
     */
    clearIndex() {
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
            request(options, { json: false }, (error, response, data) => {
                if (error) {
                    reject(error);
                }
                else {
                    let result;
                    try {
                        result = response_header_1.RespHeaderFactory.toResponseHeader(data);
                    }
                    catch (e) {
                        result = response_header_1.RespHeaderFactory.createError(JSON.stringify(e), -200);
                    }
                }
            });
        });
    }
}
exports.SolrDelete = SolrDelete;
let app = new SolrDelete();
app.clearIndex();
