import { APIGatewayProxyHandler } from "aws-lambda";
import { inMemoryRepositories } from "../../core/repositories/inmemory-impl";
import { RegisterChargeUseCase } from "../../core/usecases/register-charge";
import { z } from "zod";
import { BadRequest } from "src/core/errors/bad-request";
import { ChargeRepositoryPg } from "src/core/repositories/pg-impl/charge-repository";

const bodySchema = z.object({
  ownerId: z.string(),
  customMessage: z.string().optional(),
  demandDay: z.string(),
  serviceName: z.string(),
  totalPriceInCents: z.number()
});

export const handler: APIGatewayProxyHandler = async (event) => {
  const json: unknown = JSON.parse(event.body);
  
  const dto = bodySchema.safeParse(json);

  if (!dto.success) {
    return { statusCode: 400, body: JSON.stringify(new BadRequest()) };
  }

  const usecase = new RegisterChargeUseCase(ChargeRepositoryPg.getInstance())

  const result = await usecase.execute({
    ownerId: dto.data.ownerId,
    customMessage: dto.data.customMessage,
    demandDay: dto.data.demandDay,
    serviceName: dto.data.serviceName,
    servicePrice: dto.data.totalPriceInCents
  })

  return {
    body: JSON.stringify({
      ok: true
    }),
    statusCode: result.status,
  };
};
