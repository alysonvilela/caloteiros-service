import { BaseEntity } from "../../core/base/entity";
import { Optional } from "../../utils/optional";

interface IMember {
  phone: string;
  added_at: string;
  deleted_at: string | null;
}
export class Member extends BaseEntity<IMember> {

  get phone() {
    return this.props.phone
  }

  static create(
    props: Optional<IMember, "added_at" | "deleted_at">,
    id?: string
  ) {
    const member = new Member(
      {
        ...props,
        added_at: props.added_at ?? new Date().toISOString(),
        deleted_at: props.deleted_at ?? null,
      },
      id
    );

    return member
  }
}
