"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * March 2019
 */
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
var rp = require('request-promise');
//require('request').debug = true;
class PostTest {
    constructor() {
        this.baseRequest = request.defaults({
            "baseUrl": "http://localhost:8983/solr/zap/",
            'headers': {
                "content-type": "application/json",
                "user-agent": "coldmind-solr",
                "connection": "keep-alive"
            },
            'gzip': false,
            'json': true
        });
    }
    execute(data) {
        this.baseRequest.post("update", data, (err, httpResponse, body) => {
            if (err)
                console.log("ERR ::", err);
            console.log("BODY ::", body);
        });
    }
    executePost(method, data) {
        return new Promise((resolve, reject) => {
            this.baseRequest.post(method, data, (err, httpResponse, data) => {
                if (err) {
                    reject(err);
                    console.log("ERR ::", err);
                    return;
                }
                console.log("DATA ::", data);
                resolve(data);
            });
        });
    }
    cpTest() {
        var options = {
            "method": 'POST',
            "uri": 'http://localhost:8983/solr/zap/select',
            "content-type": "application/x-www-form-urlencoded",
            "body": {
                some: 'payload'
            },
            json: true // Automatically stringifies the body to JSON
        };
        rp(options).then((parsedBody) => {
            // POST succeeded...
            console.log("RES ::", parsedBody);
        })
            .catch(function (err) {
            // POST failed...
            console.log("ERR ::", err);
        });
    }
}
exports.PostTest = PostTest;
let test = new PostTest();
//test.execute(`<delete><query>*:*</query></delete>`);
test.executePost("select", `*:*`).then(res => {
    console.log("Execute Post ::", res);
}).catch(err => {
    console.log("Execute Post :: ERR ::", err);
});
