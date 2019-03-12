/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * March 2019
 */

import { SolrClient }             from "@lib/solr-client";
import { ServerProtocol }         from "@lib/types";
import { Const }                  from "@lib/const";
import { SolrQueryBuilder }       from "@lib/core/solr-query-builder";
import { Log }                    from "@lib/utils/logger";

let client = new SolrClient(ServerProtocol.HTTP, Const.LOCALHOST, 8983);

Log.out("URL ::", client.showDebug());

//let query = new SolrQueryBuilder().;

//client.execute();