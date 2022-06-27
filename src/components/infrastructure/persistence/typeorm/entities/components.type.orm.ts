import { Column, Entity } from 'typeorm';
import { IdTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/id.typeorm';
import { DateCustomTypeOrm } from './date-custom-type.orm';
import { StateType } from '../../../../domain/enums/state-type.enum';

@Entity("components")
export class ComponentsTypeOrm {
  @Column ((type) => IdTypeORM, { prefix: false })
  public id: IdTypeORM;

  @Column ('int', { name: 'companyId', nullable: false, unsigned: true})
  public companyId: number;

  @Column('varchar', { name: 'piece', length: 150, nullable: false })
  public piece: string;

  @Column('varchar', { name: 'description', length: 500, nullable: false })
  public description: string;

  @Column ('int', {name: 'announcementId', nullable: true, unsigned: true})
  public announcementId: number;

  @Column({ name: 'state', type: 'enum', enum: StateType, default: StateType.Pending })
  public state: StateType;

  @Column (type => DateCustomTypeOrm, { prefix: false })
  public date: DateCustomTypeOrm;

}
