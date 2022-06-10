export class GetClientByIdResponseDto {
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
    /*
    public readonly mySpecialty: string,
    public readonly myExperience: string,
    public readonly description: string,
    public readonly nameGithub: string,
    public readonly imgClient: string,

     */
  ) {}
}
