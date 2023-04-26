import Form from './Form';

export interface UserInterface {
  firstname: string;
  lastname: string;
  brainWeight: number;
  zip: string;
  birthdate: string;
  male: boolean;
  female: boolean;
  policy: boolean;
  datashere: boolean;
  flatEarth: boolean;
  cardColor: string;
  bio: string;
  avatar: string;
}

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
    this.birthdate = userForm.birthdate.current?.value || '';
    this.male = userForm.male.current?.checked || false;
    this.female = userForm.female.current?.checked || false;
    this.policy = userForm.policy.current?.checked || false;
    this.datashere = userForm.datashere.current?.checked || false;
    this.flatEarth = userForm.flatEarth.current?.checked || false;
    this.cardColor = userForm.cardColor.current?.value.toLocaleLowerCase() || 'gray';
    this.bio = userForm.bio.current?.value || 'I am a future React developer';
    this.avatar = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200';
  }
}
