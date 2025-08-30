# Use the official AWS Lambda Node.js base image
FROM public.ecr.aws/lambda/nodejs:18

# Set working directory
WORKDIR ${LAMBDA_TASK_ROOT}

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy source code
COPY tsconfig.json ./
COPY src ./src
COPY serverless.yml ./

# Install serverless and plugins for local development
RUN pnpm add -D serverless@3 serverless-esbuild serverless-offline serverless-offline-watcher typescript

# Note: esbuild will handle TypeScript compilation at runtime
# No need to pre-compile as serverless-esbuild handles this

# Expose the serverless offline port
EXPOSE 4000

# Set the entrypoint for local development
ENTRYPOINT ["npx", "serverless", "offline", "start", "--host", "0.0.0.0"]