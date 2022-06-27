export class RegisterComponentCommand {
  constructor(
    public companyId: number,
    public piece: string,
    public description: string,
    public announcementId: number,
    public date: string
  ) {}
}
