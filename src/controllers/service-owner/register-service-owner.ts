import { APIGatewayProxyHandler } from "aws-lambda";
import { inMemoryRepositories } from "../../core/repositories/inmemory-impl";
import { RegisterServiceOwnerUseCase } from "../../core/usecases/register-service-owner";


export const handler: APIGatewayProxyHandler = async (event) => {
  const usecase = new RegisterServiceOwnerUseCase(inMemoryRepositories.serviceOwnerRepository)

  const result = await usecase.execute({
    name: 'teste',
    phone: '5511989915632',
    pixKey: 'abc'
  })

  return {
    body: JSON.stringify(result?.body),
    statusCode: result.status,
  };
};
