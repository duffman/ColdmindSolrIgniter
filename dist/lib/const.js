"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@lib/types");
var Constants;
(function (Constants) {
    Constants.URL_SLASH = "/";
    Constants.LOCALHOST = "localhost";
    Constants.LOCALHOST_IP = "127.0.0.1";
    Constants.DEFAULT_PORT = 8993;
    Constants.SOLR_DEFAULT_URL = types_1.ServerProtocol.HTTP + Constants.LOCALHOST + ":" + Constants.DEFAULT_PORT.toString() + Constants.URL_SLASH;
})(Constants = exports.Constants || (exports.Constants = {}));
