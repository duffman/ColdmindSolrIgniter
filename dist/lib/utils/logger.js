"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Log {
    static info(info, data) {
        console.log("INFO ::" + info, data);
    }
    static error(info, err) {
        console.log("ERROR ::" + info, err);
    }
}
exports.Log = Log;
