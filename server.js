// Get the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var Reasoner = require('./reasoner/reasoner');
var fs = require('fs');

// Create our Express application
var app = express(); 

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use environment defined port or 3002
var port = process.env.PORT || 3002;

// Create our Express router
var router = express.Router();

/* Define route */
router.route('/query').post(function(req, res) {
	var query = '';
	req.on('data', function (chunk) {
		query += chunk;
	});
	req.on('end', function() {
		Reasoner.reason(query, res);
	});
});

router.route('/config').get(function(req,res){
	res.send(fs.readFileSync('./configFile/config.xml', 'utf8'));
});
  
// Register all our routes with /api
app.use('/', router);

// Start the server
app.listen(port);
console.log('Discovery Block on port ' + port);