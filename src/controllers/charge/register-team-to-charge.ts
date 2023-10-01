import { APIGatewayProxyHandler } from "aws-lambda";
import { inMemoryRepositories } from "../../core/repositories/inmemory-impl";
import { SendMessageToTeamsUseCase } from "../../core/usecases/send-message-to-team";
import { httpClient } from "../../adapters/http-client";
import { RegisterTeamToChargeUseCase } from "src/core/usecases/register-team-to-charge";
import { z } from "zod";
import { BadRequest } from "src/core/errors/bad-request";
import { TeamRepositoryPg } from "src/core/repositories/pg-impl/team-repository";
import { ChargeRepositoryPg } from "src/core/repositories/pg-impl/charge-repository";

const pathSchema = z.object({
  chargeId: z.string(),
});

const bodySchema = z.object({
  ownerId: z.string(),
  phones: z.array(z.string()),
});

export const handler: APIGatewayProxyHandler = async (event) => {
  const json: unknown = JSON.parse(event.body);
  const path = pathSchema.safeParse(event.pathParameters);
  const dto = bodySchema.safeParse(json);

  if (!path.success) {
    return { statusCode: 400, body: JSON.stringify(new BadRequest()) };
  }

  if (!dto.success) {
    return { statusCode: 400, body: JSON.stringify(new BadRequest()) };
  }

  const usecase = new RegisterTeamToChargeUseCase(
    TeamRepositoryPg.getInstance(),
    ChargeRepositoryPg.getInstance()
  );

  await usecase.execute({
    charge_id: path.data.chargeId,
    owner_id: dto.data.ownerId,
    phones: dto.data.phones,
  });

  return {
    body: JSON.stringify({
      ok: true,
    }),
    statusCode: 200,
  };
};
