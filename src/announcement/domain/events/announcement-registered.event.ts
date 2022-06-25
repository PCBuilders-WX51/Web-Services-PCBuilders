export class AnnouncementRegisteredEvent{
  constructor(
    public id: number,
  public title: string,
  public description: string,
  public requiredLiking: string,
  public visible: boolean,
    public companyId: number,
  ) {}
}