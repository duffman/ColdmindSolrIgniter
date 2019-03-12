"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */
exports.__esModule = true;
var coldmind_solr_client_1 = require("@lib/coldmind-solr-client");
var types_1 = require("@lib/types");
var const_1 = require("@lib/const");
var doc_parser_1 = require("@lib/doc-parser");
var solr_http_request_1 = require("@lib/core/solr-http-request");
var logger_1 = require("@lib/utils/logger");
var DemoClient = /** @class */ (function () {
    function DemoClient() {
        this.solrClient = new coldmind_solr_client_1.ColdmindSolrClient(types_1.ServerProtocol.HTTP, const_1.Const.LOCALHOST, 8983);
    }
    DemoClient.prototype.searchTechProducts = function () {
        this.solrClient.use("zap");
        var query = this.solrClient.query("*");
        this.solrClient.execute(query).then(function (res) {
            console.log("Res ::", res);
        })["catch"](function (err) {
            console.log("Err ::", err);
        });
    };
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
    DemoClient.prototype.addItems = function () {
        var _this = this;
        var req = new solr_http_request_1.SolrHttpRequest();
        var items = new Array();
        var item = new doc_parser_1.Doc("id198", ["cat111"], "ANAlleBanan i skogen", 1, "12");
        items.push(item);
        //		item = new Doc("id2", ["cat2"], "name2", 0);
        //		items.push(item);
        var data = doc_parser_1.Convert.docToJson(items);
        console.log("DATA ::", data);
        var updUrl = "http://localhost:8983/solr/zap/update";
        req.postData2(updUrl, data).then(function (r2) {
            console.log("RIFFE ::", r2);
        })["catch"](function (err) {
            logger_1.Log.error("execute :: ", err);
        });
        req.postData(updUrl, data, false).then(function (res) {
            logger_1.Log.info("addItems :: ", res);
        })["catch"](function (err) {
            logger_1.Log.error(_this.constructor.name + " :: execute :: ", err);
        });
    };
    DemoClient.prototype.testSelect = function () {
        var url = "http://localhost:8983/solr/zap/select?q=name:The";
        var client = new coldmind_solr_client_1.ColdmindSolrClient();
        client.showDebug();
    };
    DemoClient.prototype.cp = function () {
        var client = new coldmind_solr_client_1.ColdmindSolrClient();
        var url = "http://localhost:8983/solr/zap/select?q=name:The";
        client.executeUrl(url).then(function (res) {
            console.log("CPCP ::", res);
        })["catch"](function (err) {
            console.log("ERR ::", err);
        });
    };
    return DemoClient;
}());
exports.DemoClient = DemoClient;
var client = new DemoClient();
client.searchTechProducts();
//client.addItems();
//client.cp();
