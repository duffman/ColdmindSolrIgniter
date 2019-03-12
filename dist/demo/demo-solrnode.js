"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * March 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
const SolrNode = require("solr-node");
// Create client
const client = new SolrNode({
    host: '127.0.0.1',
    port: '8983',
    core: 'zap',
    protocol: 'http'
});
// JSON Data
const data = {
    id: 'SuperBalle',
    name: 'cpstar'
};
// Update document to Solr server
client.update(data, { commit: true }).then(data => {
    console.log('IResponse:', data); //result.responseHeader);
}).catch(err => {
});
