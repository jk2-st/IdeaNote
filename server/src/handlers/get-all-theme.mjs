// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const buildResponse = require('/opt/lib/buildResponse');
const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

// Get the DynamoDB table name from environment variables
const tableName = process.env.SAMPLE_TABLE;

/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
export const getAllThemeHandler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    // get all items from the table (only first 1MB data, you can use `LastEvaluatedKey` to get the rest of data)
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property
    // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html
    var params = {
        TableName : tableName,
        IndexName : "theme_list",
    };

    try {
        const data = await ddbDocClient.send(new ScanCommand(params));
        /**
         * {id: nnn, title: mmm, ....}
         * FIXME: レスポンス加工用のメソッドを作る
         */
        var items = data.Items.map(value => {
          const theme_id = (value.entity_id).replace('theme-', '');
          delete value.entity_id;
          delete value.relation_id;
          const result = Object.assign({id: parseInt(theme_id)}, value);
          return result;
        });
    } catch (err) {
        console.log("Error", err);
    }

    const response = buildResponse(items);
    // const response = {
    //     statusCode: 200,
    //     body: JSON.stringify(items),
    //     headers: {
    //         "Access-Control-Allow-Headers" : "Content-Type",
    //         "Access-Control-Allow-Origin": "*",
    //         "Access-Control-Allow-Methods": "GET"
    //     },
    // };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
