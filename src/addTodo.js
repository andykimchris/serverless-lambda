"use strict";
const { v4: uuidv4 } = require('uuid')
const AWS = require("aws-sdk")
const middy = require("@middy/core")
const httpJsonBodyParser = require("@middy/http-json-body-parser")

const addTodo = async event => {

  const dynamodb = new AWS.DynamoDB.DocumentClient()

  const { todo } = event.body
  const created = new Date().toDateString()
  const id = uuidv4()

  

  const newTodo = {
    id,
    todo,
    created,
    completedAt: false
  }

  await dynamodb.put({
    TableName: 'TodoTable',
    Item: newTodo
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(
      newTodo
    ),
  };
};

module.exports = {
  handler: middy(addTodo).use(httpJsonBodyParser())
}