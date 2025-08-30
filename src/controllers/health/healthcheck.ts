import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event) => {
  const response = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "caloteiros-service",
    environment: process.env.NODE_ENV || "development",
    whatsappApiUrl: process.env.WHATSAPP_BASE_URL || "not configured",
    databaseConfigured: !!(process.env.PGHOST && process.env.PGDATABASE && process.env.PGUSER),
  };

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response, null, 2),
  };
};