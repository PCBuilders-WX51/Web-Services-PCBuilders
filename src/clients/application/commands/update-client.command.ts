export class UpdateClientCommand {
  constructor(
    public readonly targetId: number,
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly myLiking: string,
    public readonly description: string,
  ) {}
}
