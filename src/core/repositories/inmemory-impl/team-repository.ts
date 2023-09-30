import { Team } from "../../domains/team";
import { TeamRepository } from "../team-repository";

export class TeamRepositoryInMemory implements TeamRepository {
  public db: Team[] = [];

  async queryByChargeId(chargeId: string): Promise<Team | null> {
    const team = this.db.find((i) => i.chargeId === chargeId);
    if (team) {
      return team;
    }
    return null;
  }
  async register(team: Team): Promise<void> {
    this.db.push(team);
  }
}
