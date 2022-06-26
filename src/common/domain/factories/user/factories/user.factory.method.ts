import { UserType } from '../enum/user-type';
import { UserAbstractFactory } from './abstract/user-abstract.factory';
import { ClientFactory } from './concrete/client.factory';
import { CompanyFactory } from './concrete/company.factory';

export class UserFactoryMethod {
  public static getType(userType: UserType): UserAbstractFactory {
    if (userType === UserType.CLIENT) {
      return new ClientFactory();
    }

    return new CompanyFactory();
  }
}
