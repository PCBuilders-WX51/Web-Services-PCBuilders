export class DeleteAnnouncementResponseDto {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly description: string,
    public readonly requiredLiking: string,
    public readonly visible: boolean,
    public readonly companyId: number,
  ) {}
}
