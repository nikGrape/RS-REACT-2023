import React, { Component, createRef as Ref } from 'react';
import User from './User';
import Name from './FormComponents/Name';
import Brain from './FormComponents/Brain';
import ZIP from './FormComponents/Zip';
import BirthDate from './FormComponents/BirthDate';
import Sex from './FormComponents/Sex';
import Bio from './FormComponents/Bio';
import Check from './FormComponents/Check';
import Avatar from './FormComponents/Avatar';
import { validate } from './FormComponents/FormValidator';
import CardColor from './FormComponents/CardColor';

export class FormErrors {
  firstname = false;
  lastname = false;
  brainWeight = false;
  zip = false;
  birthdate = false;
  male = false;
  female = false;
  policy = false;
  datashere = false;
  flatEarth = false;
  cardColor = false;
  bio = false;
  avatar = false;
}

interface FormProps {
  pushUser: (form: User) => void;
}

interface FormState {
  errors: FormErrors;
  avatar: string;
}

export default class Form extends Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);

    this.state = {
      errors: new FormErrors(),
      avatar: '',
    };
    this.onsubmit = this.onsubmit.bind(this);
    this.setAvatar = this.setAvatar.bind(this);
  }

  firstname = Ref<HTMLInputElement>();
  lastname = Ref<HTMLInputElement>();
  brainWeight = Ref<HTMLInputElement>();
  zip = Ref<HTMLInputElement>();
  birthdate = Ref<HTMLInputElement>();
  male = Ref<HTMLInputElement>();
  female = Ref<HTMLInputElement>();
  policy = Ref<HTMLInputElement>();
  datashere = Ref<HTMLInputElement>();
  flatEarth = Ref<HTMLInputElement>();
  cardColor = Ref<HTMLSelectElement>();
  bio = Ref<HTMLTextAreaElement>();
  avatar = Ref<HTMLInputElement>();

  hasErrors(err: FormErrors): boolean {
    return Object.values(err).some((e) => e);
  }

  setAvatar(img: string) {
    this.setState((state) => ({ ...state, avatar: img }));
    return img;
  }

  onsubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const validation = validate(this);
    this.setState((state) => ({ ...state, errors: validation }));
    if (!this.hasErrors(validation)) {
      const user = new User(this);
      if (this.state.avatar != '') user.avatar = this.state.avatar;
      this.props.pushUser(user);
      e.target.reset();
      this.setState((state) => ({ ...state, avatar: '' }));
    }
  }

  render() {
    const errors = this.state.errors;
    return (
      <form onSubmit={this.onsubmit} className="user-form">
        <div>
          <Name
            firstname={{ ref: this.firstname, err: errors.firstname }}
            lastname={{ ref: this.lastname, err: errors.lastname }}
          />
          <Brain brainWeight={{ ref: this.brainWeight, err: errors.brainWeight }} />
          <ZIP zip={{ ref: this.zip, err: errors.zip }} />
        </div>
        <BirthDate birthdate={{ ref: this.birthdate, err: errors.birthdate }} />
        <Sex
          female={{ ref: this.female, err: errors.female }}
          male={{ ref: this.male, err: errors.male }}
        />
        <Bio bio={{ ref: this.bio, err: errors.bio }} />
        <Check
          policy={{ ref: this.policy, err: errors.policy }}
          datashere={{ ref: this.datashere, err: errors.datashere }}
          flatEarth={{ ref: this.flatEarth, err: errors.flatEarth }}
        />
        <CardColor cardColor={{ ref: this.cardColor, err: errors.cardColor }} />
        <Avatar
          avatar={{ ref: this.avatar, err: errors.avatar }}
          setAvatar={this.setAvatar}
          selected={this.state.avatar != ''}
        />

        <button type="submit">submit</button>
      </form>
    );
  }
}
