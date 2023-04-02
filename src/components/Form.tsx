import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleExclamation, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

export interface User {
  avatar: string;
  firstname: string;
  lastname: string;
  brainWeight: number;
  zip: string;
  birthdate: Date;
  sex: string;
  policy: string;
  datashere: string;
  flatEarth: string;
  cardColor: string;
  bio: string;
}

interface Input {
  avatar: FileList;
  firstname: string;
  lastname: string;
  brainWeight: number;
  zip: string;
  birthdate: Date;
  sex: string;
  policy: string;
  datashere: string;
  flatEarth: string;
  cardColor: string;
  bio: string;
}

interface FormPorps {
  addUser: (user: User) => void;
}

const Form = (props: FormPorps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Input>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const avatar: () => File | null = () => {
    if (!watch('avatar')) return null;
    if (watch('avatar').length == 0) return null;
    return watch('avatar')[0];
  };

  const onSubmit: SubmitHandler<Input> = (data) => {
    console.log(data);
    props.addUser({ ...data, avatar: URL.createObjectURL(data.avatar[0]) });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="user-form">
      <input
        type="text"
        placeholder="First Name"
        className={errors.firstname ? 'flash-error' : ''}
        {...register('firstname', {
          required: 'First Name is Required',
          minLength: { value: 2, message: 'minimum length is 2' },
          validate: {
            capital: (value) =>
              /^[A-Z].+$/.test(value) ? true : 'should start with a capital letter',
            onlyLetters: (value) =>
              /^[A-Za-z]+$/.test(value) ? true : 'should contain only letters',
          },
        })}
      />
      {errors.firstname && <p className="error">{errors.firstname.message}</p>}
      <input
        type="text"
        placeholder="Last Name"
        {...register('lastname', {
          required: 'Last Name is Required',
          minLength: { value: 2, message: 'minimum length is 2' },
          validate: {
            capital: (value) =>
              /^[A-Z].+$/.test(value) ? true : 'should start with a capital letter',
            onlyLetters: (value) =>
              /^[A-Za-z]+$/.test(value) ? true : 'should contain only letters',
          },
        })}
      />
      {errors.lastname && <p className="error">{errors.lastname.message}</p>}
      <input
        type="number"
        placeholder="Brain Weight (grams)"
        {...register('brainWeight', {
          required: 'Required',
          min: { value: 1000, message: 'has to be more than 1000' },
          max: { value: 1500, message: 'has to be less than 1500' },
        })}
      />
      {errors.brainWeight && <p className="error">{errors.brainWeight.message}</p>}
      <input
        type="text"
        placeholder="ZIP"
        className={errors.zip ? 'flash-error' : ''}
        {...register('zip', {
          required: 'ZIP is required',
          pattern: { value: /^\d{4,8}$/, message: 'should contain 4-8 numbers' },
        })}
      />
      {errors.zip && <p className="error">{errors.zip.message}</p>}
      <label htmlFor="birthdate">
        Birth Date:
        <input
          type="date"
          id="birthdate"
          placeholder="Birth Date"
          {...register('birthdate', {
            required: 'Birthdate is required',
            validate: (value) => {
              const birthdate = dayjs(value);
              const go14yearsBack = dayjs().subtract(14, 'year');
              const go100yearsBack = dayjs().subtract(100, 'year');
              if (go14yearsBack.isBefore(birthdate)) return 'User has to be at least 14 years old';
              if (go100yearsBack.isAfter(birthdate)) return 'You cannot be older than a 100';
              return true;
            },
          })}
        />
      </label>
      {errors.birthdate && <p className="error">{errors.birthdate.message}</p>}
      <div className={errors.sex ? 'sex flash-error' : 'sex'}>
        <label>
          <input
            type="radio"
            value="Female"
            {...register('sex', { required: 'You need to choose one' })}
          />
          Female
        </label>
        <label>
          <input type="radio" value="Male" {...register('sex')} />
          Male
        </label>
      </div>
      {errors.sex && <p className="error">{errors.sex.message}</p>}
      <textarea
        cols={30}
        rows={1}
        placeholder="type in your bio"
        {...register('bio', {
          required: 'Bio is required',
          minLength: { value: 10, message: 'minimum length is 10 letters' },
        })}
      />
      {errors.bio && <p className="error">{errors.bio.message}</p>}

      <label htmlFor="policy">
        <input
          type="checkbox"
          id="policy"
          {...register('policy', { required: 'You have to agree to private policy' })}
        />
        I agree to the private policy
      </label>
      {errors.policy && <p className="error">{errors.policy.message}</p>}

      <label htmlFor="datashere">
        <input
          type="checkbox"
          id="datashere"
          className={errors.datashere ? 'flash-error' : ''}
          {...register('datashere', { required: 'You have to agree to share your data' })}
        />
        I agree to share my personal data
      </label>
      {errors.datashere && <p className="error">{errors.datashere.message}</p>}

      <label htmlFor="flatEarth">
        <input type="checkbox" id="flatEarth" {...register('flatEarth')} />
        {'I agree that Earth is not flat'}
      </label>
      {errors.flatEarth && (
        <p className="error">
          If you believe in flat Earth your brain weight cannot be more than 1010!
        </p>
      )}
      <label htmlFor="card-color">
        <select
          id="card-color"
          {...register('cardColor', {
            required: 'Choose a card color',
          })}
        >
          <option value="">Choose Your Card Color</option>
          <option>Default</option>
          <option>Blue</option>
          <option>Green</option>
          <option>Yellow</option>
          <option>Purple</option>
          <option>Red</option>
        </select>
      </label>
      {errors.cardColor && <p className="error">{errors.cardColor.message}</p>}
      <label
        htmlFor="avatar-input"
        className={`avatar-upload ${avatar() && !errors.avatar && 'img-selected'} ${
          errors.avatar && 'img-error'
        }`}
      >
        Avatar:
        <input
          type="file"
          id="avatar-input"
          {...register('avatar', {
            required: 'Choose an avatar',
            validate: (value) => {
              return value[0].type.match(/image\/.*/i) ? true : 'Only images accepted';
            },
          })}
        />
        <FontAwesomeIcon
          icon={!avatar() ? faUserPlus : errors.avatar ? faCircleExclamation : faCheck}
        />
      </label>
      {errors.avatar && <p className="error">{errors.avatar.message}</p>}

      <button type="submit">submit</button>
    </form>
  );
};

export default Form;
