"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
class StringUtils {
    /**
     * Returns the last character of a given string
     * @param value
     */
    static getLastChar(value) {
        let result = "";
        if (value && value.length > 0) {
            result = result[result.length - 1];
        }
        return result;
    }
}
exports.StringUtils = StringUtils;
