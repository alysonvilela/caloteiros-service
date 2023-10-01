import { sql } from "src/adapters/postgres";
import { Team } from "../../domains/team";
import { TeamRepository } from "../team-repository";
import { Member } from "src/core/domains/members";
import { pgError } from "src/utils/pg-error";

export class TeamRepositoryPg implements TeamRepository {
  private static instance: TeamRepositoryPg;

  private constructor() {}
  static getInstance(): TeamRepositoryPg {
    if (!TeamRepositoryPg.instance) {
      TeamRepositoryPg.instance = new TeamRepositoryPg();
    }

    return TeamRepositoryPg.instance;
  }

  async queryByChargeId(chargeId: string): Promise<Team | null> {
    try {
      const query = sql`
      SELECT * FROM team WHERE charge_id = ${chargeId}
    `;

    const result = await query;

    if (result.length > 0) {
      const teamData = result[0];
      return new Team({
        charge_id: teamData.charge_id,
        created_at: teamData.created_at,
        updated_at: teamData.updated_at || null,
        members: await this.queryMembersByTeamId(teamData.id),
      }, teamData.id)
    }

    return null;
  } catch(err) {
    console.error(pgError(this.queryByChargeId.name), err)
    return null
  }
    }
 

  async queryMembersByTeamId(teamId: string): Promise<Member[]> {
    try {
      const query = sql`
      SELECT * FROM member WHERE team_id = ${teamId}
    `;

    const result = await query;

    return result.map((memberData) => (new Member(
      {
        phone: memberData.phone,
        added_at: memberData.added_at,
        deleted_at: memberData.deleted_at || null,
        team_id: memberData.team_id,
      }, memberData.id)));

    } catch(err) {
      console.error(pgError(this.queryMembersByTeamId.name), err)
      return null
    }
  }

  async register(team: Team): Promise<void> {
    try {
      const query = await sql`
      INSERT INTO team (id, charge_id, created_at, updated_at)
      VALUES (${team.id}, ${team.chargeId}, ${team.createdAt}, ${team.updatedAt || null})
    `;

    console.log({run: team})

    for (const member of team.members) {
      await this.registerMember(member, team.id);
    }
  } catch(err) {
    console.error(pgError(this.queryByChargeId.name), err)
    return null
  }

  }

  async registerMember(member: Member, teamId: string): Promise<void> {
    try {
      const flat = member.flatted
      const query = await sql`
      INSERT INTO member (id, phone, added_at, deleted_at, team_id)
      VALUES (${flat.id}, ${flat.phone}, ${flat.added_at}, ${flat.deleted_at || null}, ${teamId})
    `
    console.log({query})
  
    } catch(err) {
      console.error(pgError(this.registerMember.name), err)
      return null
    }
  }
}
