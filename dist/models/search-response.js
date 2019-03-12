"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * March 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseData;
(function (ResponseData) {
    function toSearchResponse(json) {
        return JSON.parse(json);
    }
    ResponseData.toSearchResponse = toSearchResponse;
    function searchResponseToJson(value) {
        return JSON.stringify(value);
    }
    ResponseData.searchResponseToJson = searchResponseToJson;
})(ResponseData = exports.ResponseData || (exports.ResponseData = {}));
