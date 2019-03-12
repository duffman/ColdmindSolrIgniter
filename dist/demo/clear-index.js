"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * March 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
const solr_client_1 = require("@lib/solr-client");
const types_1 = require("@lib/types");
const const_1 = require("@lib/const");
const logger_1 = require("@lib/utils/logger");
let client = new solr_client_1.SolrClient(types_1.ServerProtocol.HTTP, const_1.Const.LOCALHOST, 8983);
logger_1.Log.out("URL ::", client.showDebug());
//let query = new SolrQueryBuilder().;
//client.execute();
