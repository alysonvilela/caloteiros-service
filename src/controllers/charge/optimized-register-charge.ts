import { APIGatewayProxyHandler } from "aws-lambda";
import { z } from "zod";
import { isWarmupRequest, handleWarmup, logPerformance } from "src/utils/lambda-warmup";
import { BadRequest } from "src/core/errors/bad-request";
import { headerSchema } from "src/utils/authorization";

const bodySchema = z.object({
  customMessage: z.string().optional(),
  demandDay: z.string(),
  serviceName: z.string(),
  totalPriceInCents: z.number(),
});

export const handler: APIGatewayProxyHandler = async (event) => {
  const startTime = Date.now();
  
  // Handle warmup requests early
  if (isWarmupRequest(event)) {
    return handleWarmup();
  }

  try {
    // Lazy load dependencies only when needed
    const [
      { RegisterChargeUseCase },
      { ChargeRepositoryPg }
    ] = await Promise.all([
      import("../../core/usecases/register-charge"),
      import("../../core/repositories/pg-impl/charge-repository")
    ]);

    const json: unknown = JSON.parse(event.body || '{}');

    const headerDto = headerSchema.safeParse(event.headers);
    
    if (!headerDto.success) {
      console.error('Header validation failed:', headerDto.error);
      return { 
        statusCode: 400, 
        body: JSON.stringify(new BadRequest()),
        headers: { 'Content-Type': 'application/json' }
      };
    }

    const dto = bodySchema.safeParse(json);

    if (!dto.success) {
      console.error('Body validation failed:', dto.error);
      return { 
        statusCode: 400, 
        body: JSON.stringify(new BadRequest()),
        headers: { 'Content-Type': 'application/json' }
      };
    }

    // Create new instance instead of singleton
    const chargeRepository = new ChargeRepositoryPg();
    const usecase = new RegisterChargeUseCase(chargeRepository);

    const result = await usecase.execute({
      ownerId: headerDto.data["x-owner-id"],
      customMessage: dto.data.customMessage,
      demandDay: dto.data.demandDay,
      serviceName: dto.data.serviceName,
      servicePrice: dto.data.totalPriceInCents,
    });

    // Log performance metrics
    logPerformance('register-charge', startTime);

    return {
      body: JSON.stringify(result.body),
      statusCode: result.status,
      headers: {
        'Content-Type': 'application/json',
        'X-Execution-Time': `${Date.now() - startTime}ms`
      }
    };

  } catch (error) {
    console.error('Unexpected error:', error);
    logPerformance('register-charge-error', startTime);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
};