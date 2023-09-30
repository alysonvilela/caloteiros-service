import { BaseEntity } from "../base/entity";

interface ICharge {
  owner_id: string
  service: string
  value: number
  created_at: string
  updated_at: string
}


class Charge extends BaseEntity<ICharge> {

}