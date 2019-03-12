"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@lib/types");
var Const;
(function (Const) {
    Const.URL_SLASH = "/";
    Const.LOCALHOST = "localhost";
    Const.LOCALHOST_IP = "127.0.0.1";
    Const.DEFAULT_PORT = 8993;
    Const.SOLR_DEFAULT_URL = types_1.ServerProtocol.HTTP + Const.LOCALHOST + ":" + Const.DEFAULT_PORT.toString() + Const.URL_SLASH;
    // -- //
    Const.WILDCARD = "*";
})(Const = exports.Const || (exports.Const = {}));
