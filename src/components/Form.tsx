import React, { Component, createRef as Ref } from 'react';
import UserCard, { UserInterface } from './UserCard';
import User from './User';

export default class Form extends Component {
  constructor(props: object) {
    super(props);

    this.onsubmit = this.onsubmit.bind(this);
    this.onchange = this.onchange.bind(this);
    this.onblur = this.onblur.bind(this);
  }
  wasChanged = 0;
  users: UserInterface[] = [];

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

  onsubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const user = new User(this);
    if (user.validate()) {
      this.users.push(user);
    } else {
      console.log('user validation failed');
    }
  }

  onchange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    this.setState({ wasChanged: Math.random() });
  }

  onblur(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    this.setState({ wasChanged: Math.random() });
    console.log(this.policy.current?.checked);
  }

  render() {
    return (
      <div className="page">
        <form onSubmit={this.onsubmit} method="post">
          <input
            type="text"
            name="firstname"
            ref={this.firstname}
            placeholder="First Name"
            onBlur={this.onblur}
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            ref={this.lastname}
            onBlur={this.onblur}
          />
          <input
            type="number"
            name="brain"
            id=""
            placeholder="Brain Weight"
            ref={this.brainWeight}
            onBlur={this.onblur}
          />
          <input
            type="text"
            name="zip"
            id=""
            placeholder="ZIP"
            ref={this.zip}
            onBlur={this.onblur}
          />
          <br />
          <label htmlFor="birthdate">
            Birth Date:
            <input
              type="date"
              name="birthdate"
              id="birthdate"
              placeholder="Birth Date"
              ref={this.birthdate}
              onBlur={this.onblur}
            />
          </label>
          <br />
          <label>
            <input type="radio" name="sex" value="Female" ref={this.female} onBlur={this.onblur} />
            Female
          </label>
          <label>
            <input type="radio" name="sex" value="Male" ref={this.male} onBlur={this.onblur} />
            Male
          </label>
          <br />
          <textarea name="bio" id="" cols={30} rows={5} ref={this.bio}></textarea>
          <br />
          <label htmlFor="policy">
            I agree to the private policy
            <input
              type="checkbox"
              name="policy"
              id="policy"
              ref={this.policy}
              onBlur={this.onblur}
            />
          </label>
          <br />
          <label htmlFor="datashere">
            I agree to share my <a>personal data</a>
            <input
              type="checkbox"
              name="datashere"
              id="datashare"
              ref={this.datashere}
              onBlur={this.onblur}
            />
          </label>
          <br />
          <label htmlFor="flatEarth">
            I agree that Earth is not
            <a href="https://en.wikipedia.org/wiki/Flat_Earth" target="_blank" rel="noreferrer">
              {' flat'}
            </a>
            <input
              type="checkbox"
              name="flatEarth"
              id="flatEarth"
              ref={this.flatEarth}
              onBlur={this.onblur}
            />
          </label>
          <br />
          <label htmlFor="">
            Choose your favorite color:
            <select name="cardColor" ref={this.cardColor}>
              <option value="">Gray</option>
              <option>Blue</option>
              <option>Green</option>
              <option>Yellow</option>
              <option>Purple</option>
              <option>Red</option>
            </select>
          </label>
          <br />
          <label>
            Avatar:
            <input type="file" name="avatar" id="" ref={this.avatar} />
          </label>

          <button type="submit">submit</button>
        </form>

        <div className="cards">
          {this.users.map((user, i) => (
            <UserCard {...user} key={i + user.lastname} />
          ))}
        </div>
      </div>
    );
  }
}
