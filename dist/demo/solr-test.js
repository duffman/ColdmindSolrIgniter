"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * March 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
const solr_client_1 = require("@lib/solr-client");
const solr_query_builder_1 = require("@lib/core/solr-query-builder");
let client = new solr_client_1.SolrClient();
let qb = new solr_query_builder_1.SolrQueryBuilder();
qb.all();
