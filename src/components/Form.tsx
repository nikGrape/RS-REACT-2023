import React, { Component, createRef as Ref } from 'react';
import User from './User';
import Name from './FormComponents/Name';
import Brain from './FormComponents/Brain';
import ZIP from './FormComponents/Zip';
import BirthDate from './FormComponents/BirthDate';
import Sex from './FormComponents/Sex';
import Check from './FormComponents/Check';
import Avatar from './FormComponents/Avatar';
import { validate } from './FormComponents/FormValidator';

interface FormProps {
  pushUser: (form: User) => void;
}

export class FromErrors {
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

export default class Form extends Component<FormProps, { errors: FromErrors }> {
  constructor(props: FormProps) {
    super(props);

    this.state = {
      errors: new FromErrors(),
    };
    this.onsubmit = this.onsubmit.bind(this);
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

  hasErrors(err: FromErrors): boolean {
    return Object.values(err).some((e) => e);
  }

  onsubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const validation = validate(this);
    this.setState((state) => ({ ...state, errors: validation }));
    if (!this.hasErrors(validation)) {
      this.props.pushUser(new User(this));
      e.target.reset();
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
        <textarea
          name="bio"
          cols={30}
          rows={1}
          ref={this.bio}
          placeholder="type in your bio"
        ></textarea>
        <Check
          policy={{ ref: this.policy, err: errors.policy }}
          datashere={{ ref: this.datashere, err: errors.datashere }}
          flatEarth={{ ref: this.flatEarth, err: errors.flatEarth }}
        />
        <label htmlFor="card-color">
          <select name="cardColor" id="card-color" ref={this.cardColor}>
            <option value="">Choose Your Card Color</option>
            <option>Blue</option>
            <option>Green</option>
            <option>Yellow</option>
            <option>Purple</option>
            <option>Red</option>
          </select>
        </label>

        <Avatar avatar={{ ref: this.avatar, err: errors.avatar }} />

        <button type="submit">submit</button>
      </form>
    );
  }
}
