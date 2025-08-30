import { APIGatewayProxyHandler } from "aws-lambda";
import { getConnection } from "../../adapters/postgres";

export const handler: APIGatewayProxyHandler = async (event) => {
  let databaseStatus = "not tested";
  let databaseError = null;

  // Test database connectivity
  try {
    const sql = getConnection();
    const result = await sql`SELECT NOW() as current_time, version() as pg_version`;
    databaseStatus = "connected";
  } catch (error) {
    databaseStatus = "error";
    databaseError = error instanceof Error ? error.message : "Unknown error";
  }

  const response = {
    status: databaseStatus === "connected" ? "healthy" : "unhealthy",
    timestamp: new Date().toISOString(),
    service: "caloteiros-service",
    environment: process.env.NODE_ENV || "development",
    whatsappApiUrl: process.env.WHATSAPP_BASE_URL || "not configured",
    database: {
      status: databaseStatus,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      error: databaseError,
    },
  };

  return {
    statusCode: databaseStatus === "connected" ? 200 : 503,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response, null, 2),
  };
};