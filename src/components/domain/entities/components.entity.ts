import { AggregateRoot } from '@nestjs/cqrs';
import { Id } from '../../../common/domain/value-objects/id.value';
import { DateCustom } from '../value-objects/date-custom';
import { StateType } from '../enums/state-type.enum';
import { ComponentAcceptedEvent } from "../events/component-accepted.event";
import { ComponentDeniedEvent } from "../events/component-denied.event";
import { ComponentCreatedEvent } from "../events/component-created.event";

export class ComponentsEntity extends AggregateRoot {
  private id: Id;
  private readonly companyId: number;
  private readonly piece: string;
  private readonly description: string;
  private readonly announcementId: number;
  private date: DateCustom;
  private state: StateType

  constructor(
    id: Id,
    companyId: number,
    piece: string,
    description: string,
    announcementId: number,
    state: StateType,
    date: DateCustom
  ) {
    super();
    this.id = id;
    this.companyId = companyId;
    this.piece = piece;
    this.description = description;
    this.announcementId = announcementId;
    this.state = state;
    this.date = date;
  }

  public accepted() {
    const event = new ComponentAcceptedEvent(
      this.showComponentId(),
      this.showcompanyId(),
      this.showpiece(),
      this.showdescription(),
      this.showAnnouncementId(),
      this.showState(),
      this.showDatePostulation()
    );
    this.apply(event);
  }

  public denied() {
    const event = new ComponentDeniedEvent(
      this.showComponentId(),
      this.showcompanyId(),
      this.showpiece(),
      this.showdescription(),
      this.showAnnouncementId(),
      this.showState(),
      this.showDatePostulation()
    );
    this.apply(event);
  }

  public created() {
    const event = new ComponentCreatedEvent(
      this.showComponentId(),
      this.showcompanyId(),
      this.showpiece(),
      this.showdescription(),
      this.showAnnouncementId(),
      this.showState(),
      this.showDatePostulation()
    );
    this.apply(event);
  }

  public showComponentId() {
    return this.id.getValue();
  }

  public changeId(id: Id) {
    this.id = id;
  }
  public showcompanyId() {
    return this.companyId;
  }
  public showpiece() {
    return this.piece;
  }
  public showdescription() {
    return this.description;
  }
  public showAnnouncementId() {
    return this.announcementId;
  }
  public showDatePostulation() {
    return this.date.getDate();
  }
  public showState() {
    return this.state;
  }
  public changeState(state: StateType) {
    this.state = state;
  }
  public changeDatePostulation(date: string) {
    this.date = DateCustom.from(date);
  }
}
