import { Charge } from "../domains/charge";

export abstract class ChargeRepository {
  abstract queryById(chargeId: string): Promise<Charge | null>;
  abstract queryAllChargeIdsByDemandDay(
    demandDay: string
  ): Promise<string[] | null>;
  abstract register(charge: Charge): Promise<void>;
}
