export class ClientId {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: number) {
    return new ClientId(value);
  }

  public getValue(): number {
    return this.value;
  }
}
