// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand} from '@aws-sdk/lib-dynamodb';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const buildResponse = require('/opt/lib/buildResponse');
const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

// Get the DynamoDB table name from environment variables
const tableName = process.env.SAMPLE_TABLE;

/**
 * A simple example includes a HTTP get method to get one item by id from a DynamoDB table.
 */
export const getCommentsById = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);
 
  // Get id from pathParameters from APIGateway because of `/{id}` at template.yaml
  const id = 'theme-' + event.pathParameters.theme_id;
 
  // Get the item from the table
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property
  const params = {
    TableName: tableName,
    IndexName : "comment_list",
    KeyConditionExpression: 'relation_id = :id',
    FilterExpression: "delete_flg <> :value",
    ExpressionAttributeValues: {
      ':id': id,
      ':value': 1
    },
  };

  try {
    const data = await ddbDocClient.send(new QueryCommand(params));
    /**
     * {id: nnn, theme_id: mmm, ...}
     * FIXME: レスポンス加工用のメソッドを作る
     */
    var items = data.Items.map(value => {
      const comment_id = (value.entity_id).replace('comment-', '');
      const theme_id = (value.relation_id).replace('theme-', '');
      delete value.entity_id;
      delete value.relation_id;
      const result = Object.assign({id: parseInt(comment_id), theme_id: parseInt(theme_id)}, value);
      return result;
    });
  } catch (err) {
    console.log("Error", err);
  }

  // const response = {
  //   statusCode: 200,
  //   body: JSON.stringify(items),
  //   headers: {
  //     "Access-Control-Allow-Headers" : "Content-Type",
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET"
  //    },

  // };
 
  const response = buildResponse(items);
  // All log statements are written to CloudWatch
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
};