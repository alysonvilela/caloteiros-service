import { APIGatewayProxyHandler } from "aws-lambda";
import { inMemoryRepositories } from "../../core/repositories/inmemory-impl";
import { GetChargesToSendMessagesUseCase } from "../../core/usecases/get_charges_to_send_messages";

export const handler: APIGatewayProxyHandler = async (event) => {
  const usecase = new GetChargesToSendMessagesUseCase(
    {},
    inMemoryRepositories.chargeRepository
  );
  await usecase.execute();

  return {
    body: JSON.stringify({
      ok: true,
    }),
    statusCode: 200,
  };
};
