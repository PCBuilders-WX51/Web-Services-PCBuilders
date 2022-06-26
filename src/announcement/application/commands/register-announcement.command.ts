export class RegisterAnnouncementCommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly requiredLiking: string,
    public readonly visible: boolean,
    public readonly companyId: number,
  ) {}
}
