import { BaseEntity, Flatted } from "../../core/base/entity";
import { Optional } from "../../utils/optional";

export interface ICharge {
  owner_id: string
  service: {
    name: string
    value: number
  }
  demand_day: string
  custom_message?:string
  created_at: string
  updated_at: string | null
  deleted_at: string | null
}

export class Charge extends BaseEntity<ICharge> {

  get ownerId() {
    return this.props.owner_id
  }

  get service() {
    return this.props.service
  }

  get demandDay() {
    return this.props.demand_day
  }

  get customMessage() {
    return this.props.custom_message
  }

  get created_at() {
    return this.props.created_at
  }

  get updated_at() {
    return this.props.updated_at
  }

  get deleted_at() {
    return this.props.deleted_at
  }

  static create(
    props: Optional<ICharge, "created_at" | "updated_at" | "deleted_at">,
    id?: string
  ) {
    const charge = new Charge(
      {
        ...props,
        created_at: props.created_at ?? new Date().toISOString(),
        updated_at: props.updated_at ?? null,
        deleted_at: props.deleted_at ?? null,
      },
      id
    );

    return charge
  }
}
