import { APIGatewayProxyHandler } from "aws-lambda";
import { RegisterTeamToChargeUseCase } from "../../core/usecases/register-team-to-charge";
import { z } from "zod";
import { BadRequest } from "src/core/errors/bad-request";
import { TeamRepositoryPg } from "src/core/repositories/pg-impl/team-repository";
import { ChargeRepositoryPg } from "src/core/repositories/pg-impl/charge-repository";
import { headerSchema } from "src/utils/authorization";

const pathSchema = z.object({
  chargeId: z.string(),
});

const bodySchema = z.object({
  phones: z.array(z.string()),
});

export const handler: APIGatewayProxyHandler = async (event) => {
  const json: unknown = JSON.parse(event.body);
  const path = pathSchema.safeParse(event.pathParameters);
  const dto = bodySchema.safeParse(json);
  const headerDto = headerSchema.safeParse(event.headers);

  if (!headerDto.success) {
    return { statusCode: 400, body: JSON.stringify(new BadRequest()) };
  }


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

  const res = await usecase.execute({
    charge_id: path.data.chargeId,
    owner_id: headerDto.data["x-owner-id"],
    phones: dto.data.phones,
  });

  return {
    body: JSON.stringify(res?.body),
    statusCode: res.status,
  };
};
