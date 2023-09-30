import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event) => {

  return {
    body: JSON.stringify({
      message: "Go Serverless v3! Your function executed successfully!",
      input: event,
    }),
    statusCode: 400,
  };
};
