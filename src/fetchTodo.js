const AWS = require("aws-sdk")

const fetchTodo = async event => {

    const dynamodb = new AWS.DynamoDB.DocumentClient()
    let todo;
    let { id } = event.pathParameters

    try {
        const result = await dynamodb.get({ TableName: "TodoTable", Key: { id } }).promise()
        todo = result.Item
    } catch (error) {
        console.log(error)
    }

  return {
    statusCode: 200,
    body: JSON.stringify(
      todo
    ),
  };
};

module.exports = {
  handler: fetchTodo
}