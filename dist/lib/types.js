"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ContentType;
(function (ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["Form"] = "application/x-www-form-urlencoded";
})(ContentType = exports.ContentType || (exports.ContentType = {}));
var ServerProtocol;
(function (ServerProtocol) {
    ServerProtocol["HTTP"] = "http://";
    ServerProtocol["HTTPS"] = "https://";
})(ServerProtocol = exports.ServerProtocol || (exports.ServerProtocol = {}));
var SolrRequestHandler;
(function (SolrRequestHandler) {
    SolrRequestHandler["Select"] = "select";
    SolrRequestHandler["Update"] = "update";
})(SolrRequestHandler = exports.SolrRequestHandler || (exports.SolrRequestHandler = {}));
