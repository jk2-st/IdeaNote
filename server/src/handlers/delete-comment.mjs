// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const buildResponse = require('/opt/lib/buildResponse');
// Get the DynamoDB table name from environment variables
const tableName = process.env.SAMPLE_TABLE;

/**
 * A simple example includes a HTTP delete method to add one item to a DynamoDB table.
 * /themes/{theme_id}/comments/{id}:
 * event.pathParameters = {
 *   "theme_id": bbb,
 *   "id": aaa,
 * },
 */
export const deleteCommentHandler = async (event) => {
    if (event.httpMethod !== 'DELETE') {
        throw new Error(`deleteMethod only accepts delete method, you tried: ${event.httpMethod} method.`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Get id and name from the body of the request
    const id = 'comment-' + event.pathParameters.comment_id;
    const theme_id = 'theme-' + event.pathParameters.theme_id;

    try {
      // コメントを論理削除
      var delete_parameters = {
        TableName: tableName,
        Key: {
          entity_id : id,
          relation_id : theme_id,
        },
        UpdateExpression: 'SET #delete_flg = :DELETE_FLG',
        ExpressionAttributeNames: {
          '#delete_flg': 'delete_flg'
        },
        ExpressionAttributeValues: {
          ':DELETE_FLG': 1,
        },
        ReturnValues: 'UPDATED_NEW'
      };
      const data = await ddbDocClient.send(new UpdateCommand(delete_parameters));
      console.log("Success - item added or updated", data);
      var result = {id: parseInt(event.pathParameters.id), theme_id: parseInt(event.pathParameters.theme_id), message: '削除成功しました'};
    } catch (err) {
      console.log("Error", err.stack);
    }

    const response = buildResponse(result);

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
