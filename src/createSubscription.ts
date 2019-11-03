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

export const createSubscription = async (event, _context): Promise<APIGatewayProxyResult> => {
  const params = {
    TableName: "kishor-workshop2",
    Item: {
      userId: uuid.v1(),
      status: "SUBSCRIBED",
      startsAt: new Date().getTime()
    }
  }
  try{
    const results = await dynamoDb.put(params).promise()
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
