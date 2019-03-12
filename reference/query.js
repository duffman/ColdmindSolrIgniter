/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * March 2019
 */
var solr = require("solr-client");
var options = {
    path: '/zap/'
};
var solrClient = solr.createClient(options);
var client = solr.createClient();
var query = client.createQuery().q('zap');
/*	.dismax()
    .qf({title_t : 0.2 , description_t : 3.3})
    .mm(2)
    .start(0)
    .rows(10);
*/
client.search(query, function (err, obj) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(obj);
    }
});
