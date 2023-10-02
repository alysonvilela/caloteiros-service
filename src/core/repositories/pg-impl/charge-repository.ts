import { sql } from "src/adapters/postgres";
import { Charge } from "../../domains/charge";
import { ChargeRepository } from "../charge-repository";
import { pgError } from "src/utils/pg-error";

export class ChargeRepositoryPg implements ChargeRepository {
  private static instance: ChargeRepositoryPg;

  private constructor() {}

  static getInstance(): ChargeRepositoryPg {
    if (!ChargeRepositoryPg.instance) {
      ChargeRepositoryPg.instance = new ChargeRepositoryPg();
    }

    return ChargeRepositoryPg.instance;
  }


  async queryById(chargeId: string): Promise<Charge> {
    try {
      const result = await sql`
      SELECT * FROM charge WHERE id = ${chargeId}
    `;

    if (!result.length) {
      return null
    }

    const pg = result[0] as {
      id: string
      custom_message: string
      demand_day: string
      owner_id: string
      svs_name: string
      svs_value_in_cents: number
      created_at: string
      updated_at: string | null
      deleted_at: string
    };

    const serviceOwner = new Charge(
      {
        custom_message: pg.custom_message,
  
        demand_day: pg.demand_day,
        owner_id: pg.owner_id,
        service: {
          name: pg.svs_name,
          value: pg.svs_value_in_cents
        },
        created_at: pg.created_at,
        updated_at: pg.updated_at,
        deleted_at: pg.deleted_at,
      },
      pg.id
    );

    return serviceOwner;
    } catch(err) {
      console.error(pgError(this.queryById.name), err)
      return null
    }
  }

  async queryAllChargeIdsByDemandDay(demandDay: string): Promise<string[]> {
    try {
      const pgResult = await sql`
      SELECT id FROM charge WHERE demand_day = '${demandDay}'
    `;

      const result = pgResult.map((val) => `${val}`)
      return result
    } catch(err) {
      console.error(pgError(this.queryAllChargeIdsByDemandDay.name), err)
      return null
    }
  }

  async register(charge: Charge): Promise<void> {
    const { id, ownerId, service,customMessage, created_at, deleted_at, demandDay, updated_at, } = charge;

    try {
      await sql`
      INSERT INTO charge (id, owner_id, svs_name, svs_value_in_cents, demand_day, custom_message, created_at, updated_at, deleted_at)
      VALUES (${id}, ${ownerId}, ${service.name}, ${service.value}, ${demandDay}, ${customMessage}, ${created_at}, ${updated_at}, ${deleted_at})
    `;
    } catch (err) {
      console.error(pgError(this.register.name), err)
      return null
    }
  }
}
