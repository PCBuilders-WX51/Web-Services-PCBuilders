import { AggregateRoot } from '@nestjs/cqrs';
import { AnnouncementId } from '../value-objects/announcement-id.value';
import { AnnouncementRegisteredEvent } from '../events/announcement-registered.event';
import { register } from 'tsconfig-paths';
import { CompanyId } from '../../../companies/domain/value-objects/company-id.value';

export class Announcement extends AggregateRoot {
  private id: AnnouncementId;
  private title: string;
  private description: string;
  private requiredLiking: string;
  private visible: boolean;
  private companyId: number;

  public constructor(
    id: AnnouncementId,
    title: string,
    description: string,
    requiredLiking: string,
    visible: boolean,
    companyId: number,
  ) {
    super();
    this.id = id;
    this.title = title;
    this.description = description;
    this.requiredLiking = requiredLiking;
    this.visible = visible;
    this.companyId = companyId;
  }
  public register() {
    const event = new AnnouncementRegisteredEvent(
      this.id.getValue(),
      this.title,
      this.description,
      this.requiredLiking,
      this.visible,
      this.companyId,
    );
    this.apply(event);
  }
  public getId(): AnnouncementId {
    return this.id;
  }
  public getTitle(): string {
    return this.title;
  }
  public getDescription(): string {
    return this.description;
  }
  public getSpecialty(): string {
    return this.requiredLiking;
  }
  public getVisible(): boolean {
    return this.visible;
  }
  public getCompanyId(): number {
    return this.companyId;
  }
  public changeId(id: AnnouncementId) {
    this.id = id;
  }
}
