// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

// Get the DynamoDB table name from environment variables
const tableName = process.env.SAMPLE_TABLE;

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
export const postThemeHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Get id and name from the body of the request
    const body = JSON.parse(event.body);
    const title = body.title;

    var atomic_params = {
        TableName: tableName,
        Key: {
          entity_id : 'theme_counter',
          relation_id : 'theme_counter'
        },
        UpdateExpression: 'SET #count = if_not_exists(#count, :ZERO) + :Increment',
        ExpressionAttributeNames: {
        '#count': 'count'
        },
        ExpressionAttributeValues: {
          ':ZERO': 0,
          ':Increment': 1
        },
        ReturnValues: 'UPDATED_NEW'
    };

    try {
        // ThemeのIDをアトミックカウンターでオートインクリメントする
        const atomic_counter = await ddbDocClient.send(new UpdateCommand(atomic_params));
        const theme_id = 'theme-' + atomic_counter.Attributes.count;
        var params = {
            TableName : tableName,
            Item: { entity_id : theme_id, relation_id: theme_id, title: title }
        };
        const data = await ddbDocClient.send(new PutCommand(params));
        console.log("Success - item added or updated", data);
      } catch (err) {
        console.log("Error", err.stack);
      }

    const response = {
        statusCode: 200,
        body: JSON.stringify(body),
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST"
         },
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
