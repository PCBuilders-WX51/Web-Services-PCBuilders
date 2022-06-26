export class ComponentDeniedEvent {
  constructor(
    public id: number,
    public companyId: number,
    public piece: string,
    public description: string,
    public announcementId: number,
    public state: string,
    public date: string
  ) {}
}
