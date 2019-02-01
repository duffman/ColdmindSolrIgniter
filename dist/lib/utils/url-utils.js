"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("@lib/const");
const string_utils_1 = require("@lib/utils/string-utils");
class UrlUtils {
    /**
     * Ensures that the given string contains a trailing slash
     * @param value
     * @returns {string}
     */
    static ensureTrailingSlash(value) {
        if (string_utils_1.StringUtils.getLastChar(value) !== const_1.Constants.URL_SLASH) {
            value = value + const_1.Constants.URL_SLASH;
        }
        return value;
    }
}
exports.UrlUtils = UrlUtils;
