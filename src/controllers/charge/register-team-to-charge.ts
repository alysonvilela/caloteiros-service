import { APIGatewayProxyHandler } from "aws-lambda";
import { inMemoryRepositories } from "../../core/repositories/inmemory-impl";
import { SendMessageToTeamsUseCase } from "../../core/usecases/send-message-to-team";
import { httpClient } from "../../adapters/http-client";
import { RegisterTeamToChargeUseCase } from "src/core/usecases/register-team-to-charge";

export const handler: APIGatewayProxyHandler = async (event) => {
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
