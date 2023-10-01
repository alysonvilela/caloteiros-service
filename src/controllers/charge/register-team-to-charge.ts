import { APIGatewayProxyHandler } from "aws-lambda";
import { inMemoryRepositories } from "../../core/repositories/inmemory-impl";
import { SendMessageToTeamsUseCase } from "../../core/usecases/send-message-to-team";
import { httpClient } from "../../adapters/http-client";
import { RegisterTeamToChargeUseCase } from "src/core/usecases/register-team-to-charge";
import { z } from "zod";
import { BadRequest } from "src/core/errors/bad-request";

const bodySchema = z.object({
  chargeId: z.string(),
  ownerId: z.string(),
  phones: z.array(z.string())
});


export const handler: APIGatewayProxyHandler = async (event) => {
  const json: unknown = JSON.parse(event.body);
  const dto = bodySchema.safeParse(json);

  if (!dto.success) {
    return { statusCode: 400, body: JSON.stringify(new BadRequest()) };
  }


  const usecase = new RegisterTeamToChargeUseCase(
    inMemoryRepositories.teamRepository,
    inMemoryRepositories.chargeRepository,
  );

  await usecase.execute({
    charge_id: 'charge-id',
    owner_id: 'owner-id',
    phones: [
      "55989915632"
    ]
  });

  return {
    body: JSON.stringify({
      ok: true,
    }),
    statusCode: 200,
  };
};
