import { BaseEntity } from "../../core/base/entity";
import { Optional } from "../../utils/optional";
import { Member } from "./members";

export interface ITeam {
  charge_id: string
  members: Member[]
  created_at: string
  updated_at: string | null
}
export class Team extends BaseEntity<ITeam> {

  get chargeId() {
    return this.props.charge_id
  }

  get members() {
    return this.props.members
  }

  get createdAt() {
    return this.props.created_at
  }

  get updatedAt() {
    return this.props.updated_at
  }

  static create(
    props: Optional<ITeam, "created_at" | "updated_at">,
    id?: string
  ) {
    const team = new Team(
      {
        ...props,
        created_at: props.created_at ?? new Date().toISOString(),
        updated_at: props.updated_at ?? null,
      },
      id
    );

    return team
  }
}
