import { TeamRepository } from "../repositories/team-repository";
import { ChargeRepository } from "../repositories/charge-repository";
import { makeMessage } from "../../utils/make-message";
import { HttpClient } from "../../adapters/http-client";
import { ServiceOwnerRepository } from "../repositories/service-owners-repository";

interface UsecaseResquest {
  charge_id: string;
}

export class SendMessageToTeamsUseCase {
  constructor(
    // private readonly queue: TeamRepository,
    private readonly httpClient: HttpClient,
    private readonly serviceOwnerRepository: ServiceOwnerRepository,
    private readonly chargeRepository: ChargeRepository,
    private readonly teamRepository: TeamRepository
  ) {}

  async execute(req: UsecaseResquest): Promise<void> {
    const charge = await this.chargeRepository.queryById(req.charge_id);

    if (charge) {
      const chargeTeam = await this.teamRepository.queryByChargeId(charge.id);
      const owner = await this.serviceOwnerRepository.queryById(charge.ownerId);
      if (chargeTeam) {
        const valueForEachMember =
          charge.service.value / (chargeTeam.members.length + 1); // + 1 - Because owner counts
        const message = makeMessage({
          customMessage: charge.customMessage ?? null,
          serviceName: charge.service.name,
          value: valueForEachMember,
          pixKey: owner?.pixKey ?? "vc sabe qual eh otari0!",
        });
      
        for (const member of chargeTeam.members) {
          await this.httpClient.request.get(
            `${process.env.WHATSAPP_BASE_URL}/api/sendText`,
            {
              params: {
                phone: member.phone,
                text: message,
                session: 'default'
              }
            }
          );
        }
      }
    }
  }
}
