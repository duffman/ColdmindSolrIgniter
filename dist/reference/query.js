const solr=require('solr-client');let options={path:'/zap/'};let solrClient=solr.createClient(options);let client=solr.createClient();let query=client.createQuery().q('zap');client.search(query,function(err,obj){if(err){console.log(err);}else{console.log(obj);}});