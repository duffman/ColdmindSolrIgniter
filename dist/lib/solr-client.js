"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
const solr_http_request_1 = require("@lib/core/solr-http-request");
const types_1 = require("@lib/types");
const types_2 = require("@lib/types");
const const_1 = require("@lib/const");
const logger_1 = require("@lib/utils/logger");
const doc_parser_1 = require("@lib/doc-parser");
const solr_transaction_1 = require("@lib/core/solr-transaction");
class SolrClient {
    constructor(protocol = types_2.ServerProtocol.HTTP, host = const_1.Const.LOCALHOST, port = const_1.Const.DEFAULT_PORT) {
        this.protocol = protocol;
        this.host = host;
        this.port = port;
    }
    use(collection) {
        console.log("USE COLLECTION ::", collection);
        this.collection = collection;
    }
    compileUrl() {
        return this.protocol + this.host + ":" + this.port + const_1.Const.URL_SLASH;
    }
    showDebug() {
        let url = this.compileUrl();
        logger_1.Log.debug(`---------------- ${url}`);
    }
    executeUrl(url) {
        let solrRequest = new solr_http_request_1.SolrHttpRequest();
        return new Promise((resolve, reject) => {
            solrRequest.postData(url, null, false).then(res => {
                console.log("DATA ::", res);
            }).catch(err => {
                logger_1.Log.error(this.constructor.name + " :: execute :: ", err);
                reject(err);
            });
        });
    }
    execute(transaction) {
        //http://localhost:8983/solr/techproducts/select?q=*:*&start=5
        let url = this.compileUrl();
        console.log("URL after Compile ::", url);
        let solrRequest = new solr_http_request_1.SolrHttpRequest();
        // DEBUG
        url = url + "solr/" + this.collection + const_1.Const.URL_SLASH; // techproducts/select?q=*:*&start=5";
        console.log("Collection SET AS ::", this.collection);
        console.log(">>> URL ::", url);
        return new Promise((resolve, reject) => {
            let requestStr = transaction.compile();
            solrRequest.postData(url, null, false).then(res => {
                logger_1.Log.info("execute :: ", res);
                let data = doc_parser_1.Convert.toDoc(res);
                console.log("DATA ::", data);
            }).catch(err => {
                logger_1.Log.error(this.constructor.name + " :: execute :: ", err);
            });
        });
    }
    query(collection) {
        let solrQuery = new solr_transaction_1.SolrTransaction(types_1.SolrRequestHandler.Select);
        this.collection = collection;
        return solrQuery;
    }
}
exports.SolrClient = SolrClient;
