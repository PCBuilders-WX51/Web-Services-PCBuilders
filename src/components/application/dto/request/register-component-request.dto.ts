export class RegisterComponentRequestDto {
  constructor(
    public readonly companyId: number,
    public readonly piece: string,
    public readonly description: string,
    public readonly announcementId: number,
    public readonly date: string) {}
}
