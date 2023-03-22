import Form from './Form';
import { UserInterface } from './UserCard';

export default class User implements UserInterface {
  firstname;
  lastname;
  brainWeight;
  zip;
  birthdate;
  male;
  female;
  policy;
  datashere;
  flatEarth;
  cardColor;
  bio;
  avatar;

  constructor(userForm: Form) {
    this.firstname = userForm.firstname.current?.value || '';
    this.lastname = userForm.lastname.current?.value || '';
    this.brainWeight = parseInt(userForm.brainWeight.current?.value || '0');
    this.zip = userForm.zip.current?.value || '';
    this.birthdate = new Date(userForm.birthdate.current?.value || '');
    this.male = userForm.male.current?.checked || false;
    this.female = userForm.female.current?.checked || false;
    this.policy = userForm.policy.current?.checked || false;
    this.datashere = userForm.datashere.current?.checked || false;
    this.flatEarth = userForm.flatEarth.current?.checked || false;
    this.cardColor = userForm.cardColor.current?.value.toLocaleLowerCase() || 'gray';
    this.bio = userForm.bio.current?.value || '';
    this.avatar = userForm.avatar.current?.value || '';
  }

  validate = (): boolean => {
    return true;
  };
}
