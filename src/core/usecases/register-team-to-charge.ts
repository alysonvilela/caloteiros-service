import { TeamRepository } from "../repositories/team-repository";
import { ChargeRepository } from "../repositories/charge-repository";
import { Team } from "../domains/team";
import { Member } from "../domains/members";

interface UsecaseResquest {
  owner_id: string;
  charge_id: string;
  phones: string[];
}

interface UsecaseResponse {
  status: 201 | 409 | 401
}

export class RegisterTeamToChargeUseCase {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly chargeRepository: ChargeRepository
  ) {}

  async execute(req: UsecaseResquest): Promise<UsecaseResponse> {
    const charge = await this.chargeRepository.queryByChargeId(req.charge_id)

    if(charge?.ownerId === req.owner_id) {
      const chargeHasTeam = await this.teamRepository.queryByChargeId(req.charge_id)

      if(chargeHasTeam) {
        return {
          status: 409
        }
      }

      let members: Member[] = [];
      for (const phone of req.phones) {
        const member = Member.create({
          phone,
        });
        members.push(member);
      }
  
      const team = Team.create({
        charge_id: req.charge_id,
        members,
      });
  
      await this.teamRepository.register(team)
  
      return {
        status: 201,
      };
    }
    return {
      status: 401
    }
  }
}
