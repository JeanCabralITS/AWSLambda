
const ApiBUilder = require('claudia-api-builder'),
	AWS = require('aws-sdk');
var api= new ApiBUilder(),
	dynamoDb = new AWS.DynamoDB.DocumentClient();

api.post('/icecreams' , function (request) {
	var params = {
		TableName: 'icecreams',
		Item: {
			icecreamid: request.body.icecreamId,
			name: request.body.name// your icecream name
		}
	}
	return dynamoDb.put(params).promise();

}, {success:201});

api.get('/icecreams', function(request){// GET all users
	return dynamoDb.scan({TableName:'icecreams'}).promise()
	.then(response=> response.Items)
});

module.exports = api;
