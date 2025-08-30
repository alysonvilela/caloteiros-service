export const isWarmupRequest = (event: any): boolean => {
  return event.source === 'serverless-plugin-warmup' || 
         event.detail?.source === 'serverless-plugin-warmup' ||
         event.warmup === true;
};

export const handleWarmup = (): any => {
  console.log('Lambda warmup request received');
  return { 
    statusCode: 200, 
    body: JSON.stringify({ message: 'Lambda is warm' }),
    headers: {
      'Content-Type': 'application/json'
    }
  };
};

// Environment detection
export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production';
};

export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
};

// Performance logging
export const logPerformance = (functionName: string, startTime: number): void => {
  const duration = Date.now() - startTime;
  console.log(`${functionName} execution time: ${duration}ms`);
  
  if (duration > 1000) {
    console.warn(`${functionName} took longer than 1s: ${duration}ms`);
  }
};