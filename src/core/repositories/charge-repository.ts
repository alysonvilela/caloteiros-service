import { Charge } from "../domains/charge";

export abstract class ChargeRepository {
  abstract queryByChargeId(chargeId: string): Promise<Charge | null>;
  abstract queryAllChargeIdsByDemandDay(
    demandDay: string
  ): Promise<string[] | null>;
  abstract register(charge: Charge): Promise<void>;
}
