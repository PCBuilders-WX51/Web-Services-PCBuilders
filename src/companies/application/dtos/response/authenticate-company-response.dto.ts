export class AuthenticateCompanyResponseDto{
  constructor(
    public readonly id: number,
    public readonly nameCompany: string,
    public readonly email: string,
    public readonly password: string,
    public readonly descriptionCompany: string,
  ) {}
}