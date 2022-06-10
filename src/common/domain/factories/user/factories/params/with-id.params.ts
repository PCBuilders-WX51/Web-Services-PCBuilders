import { Name } from '../../../../value-objects/name.value';
import { Email } from '../../../../value-objects/email.value';
import { Password } from '../../../../value-objects/password.value';
//import { NameCompany } from '../../../../../../companies/domain/value-objects/namecompany.value';
import { ClientId } from '../../../../../../applicants/domain/value-objects/client-id.value';
//import { CompanyId } from '../../../../../../companies/domain/value-objects/company-id.value';

export interface WithIdParams {
  //Common
  email?: Email;
  password?: Password;

  //Client
  clientId?: ClientId;
  name?: Name;
  mySpecialty?: string;
  myExperience?: string;
  description?: string;
  nameGithub?: string;
  imgClient?: string;

  //Company
  //companyId?: CompanyId;
  //nameCompany?: NameCompany;
  //descriptionCompany?: string;
  //imgCompany?: string;
}
