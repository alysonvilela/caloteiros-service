import { ServiceOwner } from "../../domains/service-owner";
import { ServiceOwnerRepository } from "../../repositories/service-owners-repository";

export class ServiceOwnerRepositoryInMemory implements ServiceOwnerRepository {
  public db: ServiceOwner[] = [];

  async queryByPhone(phone: string): Promise<ServiceOwner | null> {
    const owner = this.db.find((i) => i.phone === phone);
    if (owner) {
      return owner;
    }

    return null;
  }
  async queryById(id: string): Promise<ServiceOwner | null> {
    const owner = this.db.find((i) => i.id === id);
    if (owner) {
      return owner;
    }

    return null;
  }
  async register(serviceOwner: ServiceOwner): Promise<void> {
    this.db.push(serviceOwner);
  }
}
