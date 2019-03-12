"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
class QuerySegment {
    constructor(name, value) {
        this.name = name;
    }
}
class RangeSegment {
    constructor(name, value) {
        this.name = name;
    }
    toString() { }
}
class SolrQueryBuilder {
    constructor() {
        this.segments = new Array();
    }
    all() {
        return null;
    }
    appendSegment(name, value) {
        this.segments.push(new QuerySegment(name, value));
    }
    toString() {
        let result = "";
        for (let segment of this.segments) {
        }
        return result;
    }
}
exports.SolrQueryBuilder = SolrQueryBuilder;
