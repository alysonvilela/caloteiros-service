import { APIGatewayProxyHandler } from "aws-lambda";
import { RegisterServiceOwnerUseCase } from "../../core/usecases/register-a-charge";
import { inMemoryRepositories } from "../../core/repositories/inmemory-impl";
import { RegisterChargeUseCase } from "../../core/usecases/register-a-service-owner";
import { RegisterTeamToChargeUseCase } from "../../core/usecases/register-team-to-charge";
import { SendMessageToTeamsUseCase } from "../../core/usecases/send-message-to-team";
import { HttpClient } from "../../adapters/http-client";

export const handler: APIGatewayProxyHandler = async (event) => {
  const usecase = new SendMessageToTeamsUseCase(
    new HttpClient(),
    inMemoryRepositories.serviceOwnerRepository,
    inMemoryRepositories.chargeRepository,
    inMemoryRepositories.teamRepository
  );

  await usecase.execute({
    charge_id: 'charge-id'
  });

  return {
    body: JSON.stringify({
      ok: true,
    }),
    statusCode: 200,
  };
};
