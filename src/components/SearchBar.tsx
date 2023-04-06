import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Hint } from './Hint';

interface SearchBarProps {
  setSearch: (search: string) => void;
}

interface Input {
  search: string;
}

enum gender {
  'female',
  'male',
}

enum status {
  'dead',
  'alive',
}

enum species {
  'human',
  'alien',
  'cronenberg',
  'humanoid',
}

const SearchBar = ({ setSearch }: SearchBarProps) => {
  const [showHint, setShowHint] = useState(false);

  const { register, handleSubmit } = useForm<Input>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<Input> = (data) => {
    setSearch(validate(data.search));
  };

  const validate = (value: string) => {
    let isNamePresent = false;

    const res = value
      .trim()
      .toLocaleLowerCase()
      .split(/\s+/)
      .map((v) => {
        if (v == '') return '';
        if (Object.keys(gender).includes(v)) return `gender=${v}`;
        if (Object.keys(status).includes(v)) return `status=${v}`;
        if (Object.keys(species).includes(v)) return `species=${v}`;
        if (isNamePresent) return 'error';
        isNamePresent = true;
        return `name=${v}`;
      });

    if (res.includes('error')) return 'error';
    let query = res.join('&');
    if (query.length > 0) query = '?' + query;
    return query;
  };

  return (
    <div className="search-bar-set">
      <div id="search-bar">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            id="search-input"
            placeholder="search bar"
            {...register('search', {
              validate: (value) => {
                console.log('validation worked');

                if (validate(value) == 'error') {
                  setShowHint(true);
                  return false;
                }
                return true;
              },
            })}
          />
          <button type="submit" data-testid="search-submit" style={{ display: 'none' }} />
        </form>
      </div>
      <button type="button" onClick={() => setShowHint(true)}>
        ?
      </button>

      {showHint && (
        <Hint
          closeHint={() => setShowHint(false)}
          messages={[
            'Supported search (space separated):',
            'name dead/alive female/male human/alien/cronenberg/humanoid',
            'ex: rick male human alive',
            'ex: morty female',
          ]}
        />
      )}
    </div>
  );
};

export default SearchBar;
