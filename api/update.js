"use strict";

const AWS = require("aws-sdk")

const update = async (event) => {

  const {available} = JSON.parse(event.body);
  const {id} = event.pathParameters

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  await dynamodb.update({
    TableName: "ItemTable",
    Key: {id},
    UpdateExpression: 'set available = :available',
    ExpressionAttributeValues: {
      ':available': available
    },
    ReturnValues: "ALL_NEW"
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(
      { msg: 'Item updated'}
    ),
  };
};


module.exports = {
    handler:update
}

