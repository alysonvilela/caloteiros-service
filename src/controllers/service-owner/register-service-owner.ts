import { APIGatewayProxyHandler } from "aws-lambda";
import { inMemoryRepositories } from "../../core/repositories/inmemory-impl";
import { RegisterServiceOwnerUseCase } from "../../core/usecases/register-service-owner";

import { z } from "zod";
import { BadRequest } from "src/core/errors/bad-request";

const bodySchema = z.object({
  name: z.string().min(3),
  phone: z.string(),
  pixKey: z.string()
});

export const handler: APIGatewayProxyHandler = async (event) => {
  const json:unknown = JSON.parse(event.body);
  const dto = bodySchema.safeParse(json);

  if (!dto.success) {
    return { statusCode: 400, body: JSON.stringify(new BadRequest())};
  }

  const usecase = new RegisterServiceOwnerUseCase(inMemoryRepositories.serviceOwnerRepository)

  const result = await usecase.execute({
    name: dto.data.name,
    phone: dto.data.phone,
    pixKey: dto.data.pixKey
  })

  return {
    body: JSON.stringify(result?.body),
    statusCode: result.status,
  };
};
