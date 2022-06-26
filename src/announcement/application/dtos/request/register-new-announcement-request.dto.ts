export class RegisterNewAnnouncementRequestDto {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly requiredLiking: string,
    public readonly visible: boolean,
  ) {}
}
