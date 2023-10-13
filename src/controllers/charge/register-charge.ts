import { APIGatewayProxyHandler } from "aws-lambda";
import { RegisterChargeUseCase } from "../../core/usecases/register-charge";
import { z } from "zod";
import { BadRequest } from "src/core/errors/bad-request";
import { ChargeRepositoryPg } from "src/core/repositories/pg-impl/charge-repository";
import { headerSchema } from "src/utils/authorization";

const bodySchema = z.object({
  customMessage: z.string().optional(),
  demandDay: z.string(),
  serviceName: z.string(),
  totalPriceInCents: z.number(),
});

export const handler: APIGatewayProxyHandler = async (event) => {
  const json: unknown = JSON.parse(event.body);

  const headerDto = headerSchema.safeParse(event.headers);
  
  console.log({event: event.headers})

  if (!headerDto.success) {
    return { statusCode: 400, body: JSON.stringify(new BadRequest()) };
  }

  const dto = bodySchema.safeParse(json);

  if (!dto.success) {
    return { statusCode: 400, body: JSON.stringify(new BadRequest()) };
  }

  const usecase = new RegisterChargeUseCase(ChargeRepositoryPg.getInstance());

  const result = await usecase.execute({
    ownerId: headerDto.data["x-owner-id"],
    customMessage: dto.data.customMessage,
    demandDay: dto.data.demandDay,
    serviceName: dto.data.serviceName,
    servicePrice: dto.data.totalPriceInCents,
  });

  return {
    body: JSON.stringify(result.body),
    statusCode: result.status,
  };
};
