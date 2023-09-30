import { APIGatewayProxyHandler } from "aws-lambda";
import { RegisterServiceOwnerUseCase } from "../../core/usecases/register-a-charge";
import { inMemoryRepositories } from "../../core/repositories/inmemory-impl";
import { RegisterChargeUseCase } from "../../core/usecases/register-a-service-owner";


export const handler: APIGatewayProxyHandler = async (event) => {
  const usecase = new RegisterChargeUseCase(inMemoryRepositories.chargeRepository)

  const result = await usecase.execute({
    ownerId: 'teste',
    customMessage: 'mensagem',
    demandDay: '20',
    serviceName: 'Netflix',
    servicePrice: 5000
  })

  return {
    body: JSON.stringify({
      ok: true
    }),
    statusCode: result.status,
  };
};
