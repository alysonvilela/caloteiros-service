import { ChargeRepository } from "../repositories/charge-repository";
import { Flatted } from "../base/entity";
import { ICharge } from "../domains/charge";

interface UsecaseResquest {
  ownerId: string;
}

interface UsecaseResponse {
  status: 200;
  body?: Flatted<ICharge>[];
}

export class ListServiceOwnerChargesUseCase {
  constructor(private readonly chargeRepository: ChargeRepository) {}

  async execute(req: UsecaseResquest): Promise<UsecaseResponse> {
    const charges = await this.chargeRepository.queryAllByOwnerId(req.ownerId);

    return {
      status: 200,
      body: [...charges?.map((i) => i.flatted)],
    };
  }
}
