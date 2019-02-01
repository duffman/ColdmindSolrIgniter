"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
const coldmind_solr_client_1 = require("@lib/coldmind-solr-client");
const types_1 = require("@lib/types");
const const_1 = require("@lib/const");
const doc_parser_1 = require("@lib/doc-parser");
const solr_http_request_1 = require("@lib/core/solr-http-request");
const logger_1 = require("@lib/utils/logger");
class DemoClient {
    constructor() {
        this.solrClient = new coldmind_solr_client_1.ColdmindSolrClient(types_1.ServerProtocol.HTTP, const_1.Constants.LOCALHOST, 8983);
    }
    searchTechProducts() {
        this.solrClient.use("techproducts");
        let query = this.solrClient.query("*");
        this.solrClient.execute(query).then(res => {
            console.log("Res ::", res);
        }).catch(err => {
            console.log("Err ::", err);
        });
    }
    /*
     public id: string,
     public cat: string[],
     public name: string,
     public price: number,
     public price_c: string,
     public inStock: boolean,
     public author: string,
     public author_s: string,
     public series_t: string,
     public sequence_i: number,
     public genre_s: string*/
    addItems() {
        let req = new solr_http_request_1.SolrHttpRequest();
        let items = new Array();
        let item = new doc_parser_1.Doc("id1", ["cat1"], "name1", 1);
        items.push(item);
        item = new doc_parser_1.Doc("id2", ["cat2"], "name2", 0);
        items.push(item);
        let data = doc_parser_1.Convert.docToJson(items);
        console.log("DATA ::", data);
        req.postData("http://localhost:8983/solr/techproducts/update", data, false).then(res => {
            logger_1.Log.info("addItems :: ", res);
        }).catch(err => {
            logger_1.Log.error(this.constructor.name + " :: execute :: ", err);
        });
    }
}
exports.DemoClient = DemoClient;
let client = new DemoClient();
//client.searchTechProducts();
client.addItems();
