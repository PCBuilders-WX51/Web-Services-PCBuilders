import { Column, Entity, Unique } from 'typeorm';
import { ClientIdTypeORM } from './client.id.typeorm';
import { NameTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { EmailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/email.typeorm';
import { PasswordTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/password.typeorm';

@Entity('clients')
//@Unique('UQ_client', ['email.value', 'nameGithub'])
@Unique('UQ_client', ['email.value'])
export class ClientTypeORM {
  @Column((type) => ClientIdTypeORM, { prefix: false })
  public id: ClientIdTypeORM;

  @Column((type) => NameTypeORM, { prefix: false })
  public name: NameTypeORM;

  @Column((type) => EmailTypeORM, { prefix: false })
  public email: EmailTypeORM;

  @Column((type) => PasswordTypeORM, { prefix: false })
  public password: PasswordTypeORM;
  /*
  @Column('varchar', { name: 'my_specialty', length: 150, nullable: false })
  public mySpecialty: string;

  @Column('varchar', { name: 'my_experience', length: 500, nullable: false })
  public myExperience: string;

  @Column('varchar', { name: 'description', length: 1000, nullable: false })
  public description: string;

  @Column('varchar', { name: 'name_github', length: 150, nullable: false })
  public nameGithub: string;

  @Column('varchar', { name: 'img_client', length: 500, nullable: false })
  public imgClient: string;
   */
}
