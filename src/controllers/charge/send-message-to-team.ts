import { APIGatewayProxyHandler } from "aws-lambda";
import { inMemoryRepositories } from "../../core/repositories/inmemory-impl";
import { SendMessageToTeamsUseCase } from "../../core/usecases/send-message-to-team";
import { httpClient } from "../../adapters/http-client";
import { BadRequest } from "src/core/errors/bad-request";
import { z } from "zod";

const bodySchema = z.object({
  chargeId: z.string(),
});

export const handler: APIGatewayProxyHandler = async (event) => {
  const dto = bodySchema.safeParse(event.pathParameters);

  if (!dto.success) {
    return { statusCode: 400, body: JSON.stringify(new BadRequest()) };
  }

  const usecase = new SendMessageToTeamsUseCase(
    httpClient,
    inMemoryRepositories.serviceOwnerRepository,
    inMemoryRepositories.chargeRepository,
    inMemoryRepositories.teamRepository
  );

  try {
    await usecase.execute({
      charge_id: dto.data.chargeId,
    });
  } catch (err) {
    return {
      body: JSON.stringify({
        err,
      }),
      statusCode: 500,
    };
  }

  return {
    body: JSON.stringify({
      ok: true,
    }),
    statusCode: 200,
  };
};
