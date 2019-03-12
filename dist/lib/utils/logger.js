"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Log {
    static withPrefix(prefix, name, data = null) {
        prefix = `${prefix} :: ${name}`;
        if (!data) {
            console.log(prefix);
        }
        else {
            prefix += " ::";
            console.log(prefix, data);
        }
    }
    static out(name, data = null) {
        Log.withPrefix("OUT", name, data);
    }
    static info(info, data = null) {
        console.log("INFO ::" + info, data);
    }
    static debug(name, data = null) {
        Log.withPrefix("DEBUG", name, data);
    }
    static error(name, err = null) {
        console.log("ERROR ::" + name, err);
    }
}
exports.Log = Log;
