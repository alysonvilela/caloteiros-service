import { ChargeRepository } from "../repositories/charge-repository";
import { Charge } from "../domains/charge";
import { formatDateToCron } from "../../utils/format-date-to-cron";

interface UsecaseResquest {
  ownerId: string;
  serviceName: string;
  servicePrice: number;
  customMessage: string;
  demandDay: string;
}

interface UsecaseResponse {
  status: 201;
}

export class RegisterChargeUseCase {
  constructor(private readonly chargesRepository: ChargeRepository) {}

  async execute(req: UsecaseResquest): Promise<UsecaseResponse> {
    const charge = Charge.create({
      owner_id: req.ownerId,
      service: {
        name: req.serviceName,
        value: req.servicePrice,
      },
      custom_message: req.customMessage,
      demand_day: req.demandDay,
    });

    await this.chargesRepository.register(charge);

    return {
      status: 201,
    };
  }
}
