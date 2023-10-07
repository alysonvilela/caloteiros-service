import { APIGatewayProxyHandler } from "aws-lambda";
import { z } from "zod";
import { BadRequest } from "src/core/errors/bad-request";
import { ListServiceOwnerChargesUseCase } from "src/core/usecases/list-service-owner-charges";
import { ChargeTeamMembersRepositoryPg } from 'src/core/repositories/pg-impl/charge-team-member-repository';

const bodySchema = z.object({
  "x-owner-id": z.string(),
});

export const handler: APIGatewayProxyHandler = async (event) => {
  const dto = bodySchema.safeParse(event.headers);

  if (!dto.success) {
    return { statusCode: 400, body: JSON.stringify(new BadRequest()) };
  }

  const usecase = new ListServiceOwnerChargesUseCase(
    ChargeTeamMembersRepositoryPg.getInstance()
  );

  const result = await usecase.execute({
    ownerId: dto.data["x-owner-id"],
  });

  return {
    body: JSON.stringify(result.body),
    statusCode: result.status,
  };
};
