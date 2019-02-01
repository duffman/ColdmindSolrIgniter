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
const const_1 = require("@lib/const");
const logger_1 = require("@lib/utils/logger");
const doc_parser_1 = require("@lib/doc-parser");
const encoding_1 = require("@lib/utils/encoding");
class QueryRecord {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}
exports.QueryRecord = QueryRecord;
class SolrTransaction {
    constructor(qt) {
        this.qt = qt;
        this.records = new Array();
    }
    query(value) {
        this.records.push(new QueryRecord("q", value));
        return this;
    }
    rows(value) {
        this.records.push(new QueryRecord("rows", value));
        return this;
    }
    addItems(items) {
        return this;
    }
    compile() {
        let reqStr = this.qt;
        for (let i = 0; i < this.records.length; i++) {
            let rec = this.records;
            reqStr += rec.name + "=" + encoding_1.Encoding.encodeUriComponent(rec.value);
            if (i + 1 < this.records.length) {
                reqStr += "&";
            }
        }
    }
}
exports.SolrTransaction = SolrTransaction;
class ColdmindSolrClient {
    constructor(protocol, host, port) {
        this.protocol = protocol;
        this.host = host;
        this.port = port;
    }
    use(collection) {
        this.collection = collection;
    }
    compileUrl() {
        return this.protocol + this.host + ":" + this.port + const_1.Constants.URL_SLASH;
    }
    execute(query) {
        //http://localhost:8983/solr/techproducts/select?q=*:*&start=5
        let url = this.compileUrl();
        let solrRequest = new solr_http_request_1.SolrHttpRequest();
        // DEBUG
        url = url + "solr/" + this.collection + const_1.Constants.URL_SLASH; // techproducts/select?q=*:*&start=5";
        console.log("URL ::", url);
        return new Promise((resolve, reject) => {
            let requestStr = query.compile();
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
        let solrQuery = new SolrTransaction(types_1.SolrRequestHandler.Select);
        this.collection = collection;
        return solrQuery;
    }
}
exports.ColdmindSolrClient = ColdmindSolrClient;
