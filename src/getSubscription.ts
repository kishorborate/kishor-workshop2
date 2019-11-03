import { APIGatewayProxyHandler } from 'aws-lambda';
import {
  APIGatewayProxyEvent,
  APIGatewayEventRequestContext,
  APIGatewayProxyResult,
} from 'aws-lambda';
import 'source-map-support/register';
'use strict'
import * as uuid from 'uuid'
import { DynamoDB } from 'aws-sdk'
const dynamoDb = new DynamoDB.DocumentClient()

export const getSubscription = async (event: APIGatewayProxyEvent, _context): Promise<APIGatewayProxyResult> => {
 
  const params = {
    TableName: "kishor-workshop2",
    Key: {
        "userId": event.pathParameters.userId
       }
  }
  try{
    const results = await dynamoDb.get(params).promise()
    return{
          statusCode: 200,
          body: JSON.stringify(results)
        }
  }catch(error){
    return{
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
  
}
