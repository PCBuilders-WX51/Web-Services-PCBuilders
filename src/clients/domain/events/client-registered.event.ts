export class ClientRegisteredEvent {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public myLiking: string,
    public description: string,
  ) {}
}
