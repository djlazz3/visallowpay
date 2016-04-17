var express = require('express');
var app = express();
var request = require('request');
var fs = require('fs');
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/visa', function(req, res) {
	var data = JSON.stringify({
	    "systemsTraceAuditNumber" : "451001",
	    "retrievalReferenceNumber" : "330000550000",
	    "localTransactionDateTime" : "2016-01-21T13:32:01",
	    "acquiringBin" : "408999",
	    "acquirerCountryCode" : "840",
	    "senderPrimaryAccountNumber" : "4895142232120006",
	    "senderCardExpiryDate" : "2015-10",
	    "senderCurrencyCode" : "USD",
	    "amount" : "124.02",
        "localTransactionDateTime":"2016-04-17T02:09:54",
	    "businessApplicationId" : "AA",
	    "surcharge" : "11.99",
	    "foreignExchangeFeeTransaction" : "11.99",
	    "cavv" : "0700100038238906000013405823891061668252",
	    "cardAcceptor" : {
	        "name" : "Visa Inc. USA-Foster City",
	        "terminalId" : "ABCD1234",
	        "idCode" : "ABCD1234ABCD123",
	        "address" : {
	            "state" : "CA",
	            "county" : "San Mateo",
	            "country" : "USA",
	            "zipCode" : "94404"
	        }
	    }
	});

	var req = request.defaults();

	var userId = 'KQP9K2SLD6UF62HU04UX21IDOTtWG2_uZAixdOKMTyQRWESmY' ;
	var password = 'oMwyH72q18Qgnlk5lvp2gFl7vzoUWuNw7pMQ4K';
	var keyFile = './keys/key_Bryan.pem';
	var certificateFile ='./keys/cert.pem';

	req.post({
	    uri : "https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pullfundstransactions",
	    key: fs.readFileSync(keyFile),
	    cert: fs.readFileSync(certificateFile),
	    headers: {
	      'Content-Type' : 'application/json',
	      'Accept' : 'application/json',
	      'Authorization' : 'Basic ' + new Buffer(userId + ':' + password).toString('base64')
	    },
	    body: data
	  }, function(error, response, body) {
	    if (!error) {
	      console.log("Response Code: " + response.statusCode);
	      console.log("Headers:");
	      for(var item in response.headers) {
	        console.log(item + ": " + response.headers[item]);
	      }
	      console.log("Body: "+ body);
          res.json(body);
	    } else {
	      console.log("Got error: " + error.message);
	    }
	  }
	);
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
