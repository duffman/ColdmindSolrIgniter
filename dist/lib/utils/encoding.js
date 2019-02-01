"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
const querystring = require("querystring");
class Encoding {
    static encodeUriComponent(value) {
        let result = "";
        if (value) {
            result = querystring.escape(value);
        }
        return result;
    }
}
exports.Encoding = Encoding;
