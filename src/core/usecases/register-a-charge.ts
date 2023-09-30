import { ServiceOwner } from "../domains/service-owner";
import { ServiceOwnerRepository } from "../repositories/service-owners-repository";

interface UsecaseResquest {
  name: string;
  phone: string;
  pixKey: string;
}

interface UsecaseResponse {
  status: 201 | 409;
}

export class RegisterServiceOwnerUseCase {
  constructor(
    private readonly serviceOwnersRepository: ServiceOwnerRepository
  ) {}

  async execute(req: UsecaseResquest): Promise<UsecaseResponse> {
    const existing = await this.serviceOwnersRepository.queryByPhone(req.phone);

    if (existing) {
      return {
        status: 409,
      };
    }

    const owner = ServiceOwner.create({
      name: req.name,
      phone: req.phone,
      pix_key: req.pixKey,
    });

    await this.serviceOwnersRepository.register(owner);

    return {
      status: 201,
    };
  }
}
