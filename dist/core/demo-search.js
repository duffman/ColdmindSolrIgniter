"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * March 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const search_response_1 = require("../models/search-response");
class SolrSearch {
    constructor() {
    }
    search(query) {
        let baseUrl = "http://localhost:8983/solr/zap/select?q=*:*";
        return new Promise((resolve, reject) => {
            request(baseUrl, { json: false }, (err, res, data) => {
                if (err) {
                    reject(err);
                    return console.log(err);
                }
                //console.log(body.url);
                //console.log(body.explanation);
                resolve(data);
            });
        });
    }
}
exports.SolrSearch = SolrSearch;
let app = new SolrSearch();
app.search("").then(data => {
    /*
    console.log("responseHeader ::", data.responseHeader);
    console.log("IResponse ::", data.response);
    console.log("RES ::", JSON.stringify(data));
    */
    let response = search_response_1.ResponseData.toSearchResponse(data);
    let jsonData = JSON.stringify(response);
    console.log("Num Found ::", response.response.numFound);
    for (let doc of response.response.docs) {
        console.log("DOC ::", doc);
    }
    console.dir(response, { depth: null, colors: true });
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
