import { APIGatewayProxyHandler } from "aws-lambda";
import { BadRequest } from "src/core/errors/bad-request";
import { ListServiceOwnerChargesUseCase } from "src/core/usecases/list-service-owner-charges";
import { ChargeTeamMembersRepositoryPg } from 'src/core/repositories/pg-impl/charge-team-member-repository';
import { headerSchema } from "src/utils/authorization";


export const handler: APIGatewayProxyHandler = async (event) => {

  const headerDto = headerSchema.safeParse(event.headers);

  if (!headerDto.success) {
    return { statusCode: 400, body: JSON.stringify(new BadRequest()) };
  }
  const usecase = new ListServiceOwnerChargesUseCase(
    ChargeTeamMembersRepositoryPg.getInstance()
  );

  const result = await usecase.execute({
    ownerId: headerDto.data["x-owner-id"],
  });

  return {
    body: JSON.stringify(result.body),
    statusCode: result.status,
  };
};
