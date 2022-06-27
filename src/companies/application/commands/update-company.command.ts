export class UpdateCompanyCommand {
  constructor(
    public readonly targetId: number,
    public readonly id: number,
    public readonly nameCompany: string,
    public readonly email: string,
    public readonly password: string,
    public readonly descriptionCompany: string,
  ) {}
}
