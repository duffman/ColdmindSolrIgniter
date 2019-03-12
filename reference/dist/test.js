/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * March 2019
 */
const solr = require("solr-client");
var client = solr.createClient();
// Switch on "auto commit", by default `client.autoCommit = false`
client.autoCommit = true;
var docs = [];
for (var i = 0; i <= 10; i++) {
    var doc = {
        id: 12345 + i,
        title_t: "Title " + i,
        description_t: "Text" + i + "Alice"
    };
    docs.push(doc);
}
// Add documents
client.add(docs, function (err, obj) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(obj);
    }
});
