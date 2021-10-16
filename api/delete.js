"use strict";
const AWS = require("aws-sdk");

const remove = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const {id} = event.pathParameters

    let item;

    try {
        const result = await dynamodb.get({
            TableName: "ItemTable",
            Key: {id}
        }).promise();

        item = result.Item;

        console.log("item : " + undefined);
        if (item !== undefined){
            await dynamodb.delete({
                TableName: "ItemTable",
                Key: {id}
            }).promise();
            return {
                statusCode: 204
            };
        }else {
            return {
                statusCode: 404
            };
        }

        

    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    handler: remove,
};