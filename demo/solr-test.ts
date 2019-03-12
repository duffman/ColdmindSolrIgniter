/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * March 2019
 */

import { SolrClient } from "@lib/solr-client";
import { SolrQueryBuilder } from "@lib/core/solr-query-builder";

let client = new SolrClient();


let qb = new SolrQueryBuilder();
qb.all();


