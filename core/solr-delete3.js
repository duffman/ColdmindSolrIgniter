

var unirest = require("unirest");

var req = unirest("POST", "http://localhost:8983/solr/zap/update");

req.query({
	"wt": "json",
	"commitWithin": "1000",
	"overwrite": "true",
	"commit": "true"
});

req.headers({
	"Postman-Token": "7342124b-3572-4549-8072-70dc80a01291",
	"cache-control": "no-cache",
	"Content-Type": "application/xml,text/xml"
});

req.send("<delete><query>*:*</query></delete>");

req.end(function (res) {
	if (res.error) throw new Error(res.error);
	console.log(res.body);
});
