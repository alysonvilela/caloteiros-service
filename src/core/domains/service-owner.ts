import { BaseEntity } from "../../core/base/entity";
import { Optional } from "../../utils/optional";

interface IServiceOwner {
  pix_key: string;
  created_at: string;
  updated_at: string | null;
}
export class ServiceOwner extends BaseEntity<IServiceOwner> {

  get pixKey() {
    return this.props.pix_key
  }

  get createdAt() {
    return this.props.created_at
  }

  get updatedAt() {
    return this.props.updated_at
  }

  static create(
    props: Optional<IServiceOwner, "created_at" | "updated_at">,
    id?: string
  ) {
    const serviceOwner = new ServiceOwner(
      {
        ...props,
        created_at: props.created_at ?? new Date().toISOString(),
        updated_at: props.updated_at ?? null,
      },
      id
    );

    return serviceOwner
  }
}
