# Use Node.js Alpine for smaller image size
FROM node:18-alpine

# Install required dependencies for native modules
RUN apk add --no-cache python3 make g++ 

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install serverless framework globally
RUN npm install -g serverless

# Install dependencies
# Note: Removed --frozen-lockfile to handle cases where lockfile might be out of sync
RUN pnpm install

# Copy source code
COPY tsconfig.json ./
COPY src ./src
COPY serverless.yml ./
COPY start.sh ./

# Make start script executable
RUN chmod +x start.sh

# Expose the serverless offline port
EXPOSE 4000

# Set the entrypoint to use the start script
ENTRYPOINT ["./start.sh"]