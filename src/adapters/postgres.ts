import postgres from 'postgres'
import 'dotenv/config'

let connection: any = null;

export const getConnection = () => {
  if (!connection) {
    const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
    
    // Check if we're in local Docker environment
    const isLocal = process.env.NODE_ENV === 'development' || PGHOST === 'postgres';
    
    let URL: string;
    if (isLocal) {
      // Local Docker connection without SSL
      URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`;
    } else {
      // Production connection with SSL and endpoint ID
      URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;
    }
    
    connection = postgres(URL, { 
      ssl: isLocal ? false : 'require',
      max: 1, // Serverless optimization - single connection
      idle_timeout: 20, // Close idle connections quickly
      connect_timeout: 30, // Timeout connection attempts quickly
      prepare: false, // Disable prepared statements for serverless
      transform: postgres.camel, // Performance boost for camelCase conversion
      onnotice: () => {}, // Disable notices for performance
    });
  }
  return connection;
};

// Connection cleanup for container reuse
export const closeConnection = async () => {
  if (connection) {
    await connection.end();
    connection = null;
  }
};

// Backward compatibility export (deprecated)
export const sql = getConnection();
