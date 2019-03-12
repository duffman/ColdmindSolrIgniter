"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * March 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
const encoding_1 = require("@lib/utils/encoding");
const query_record_1 = require("@lib/core/query/query-record");
class SolrTransaction {
    constructor(qt) {
        this.qt = qt;
        this.records = new Array();
    }
    query(value) {
        this.records.push(new query_record_1.QueryRecord("q", value));
        return this;
    }
    rows(value) {
        this.records.push(new query_record_1.QueryRecord("rows", value));
        return this;
    }
    addItems(items) {
        return this;
    }
    compile() {
        let reqStr = this.qt;
        for (let i = 0; i < this.records.length; i++) {
            let rec = this.records[i];
            reqStr += rec.name + "=" + encoding_1.Encoding.encodeUriComponent(rec.value);
            if (i + 1 < this.records.length) {
                reqStr += "&";
            }
        }
        return reqStr;
    }
}
exports.SolrTransaction = SolrTransaction;
