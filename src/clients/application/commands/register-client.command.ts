export class RegisterClientCommand {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly myLiking: string,
    public readonly description: string,
  ) {}
}
