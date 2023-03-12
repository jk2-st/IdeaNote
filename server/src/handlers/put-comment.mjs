// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const buildResponse = require('/opt/lib/buildResponse');
// Get the DynamoDB table name from environment variables
const tableName = process.env.SAMPLE_TABLE;

/**
 * A simple example includes a HTTP put method to add one item to a DynamoDB table.
 * event.pathParameters = {
 *   "id": aaa,
 * },
 * event.body = {
 *  id: nnn,
 *  theme_id: mmm,
 *  comment: ooo
 * }
 */
export const putCommentHandler = async (event) => {
    if (event.httpMethod !== 'PUT') {
        throw new Error(`putMethod only accepts put method, you tried: ${event.httpMethod} method.`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Get id and name from the body of the request
    const body = JSON.parse(event.body);
    const id = 'comment-' + event.pathParameters.id;
    const theme_id = 'theme-' + body.theme_id;
    const comment = body.comment;

    try {
        var params = {
            TableName : tableName,
            Item: { entity_id : id, relation_id: theme_id, comment: comment }
        };
        const data = await ddbDocClient.send(new PutCommand(params));
        console.log("Success - item added or updated", data);
        var result = {id: parseInt(event.pathParameters.id), theme_id: parseInt(body.theme_id), comment: comment};
      } catch (err) {
        console.log("Error", err.stack);
      }

    const response = buildResponse(result);

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
