import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { Hint } from './Hint';
import { selectSearch, setSearchText, fetchData, BASE_URL } from '../redux/searchSlice';
import { AppThunkDispatch } from '../store';

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
  'animal',
  'creature',
  'poopybutthole',
  'robot',
  'disease',
}

const SearchBar = () => {
  const [showHint, setShowHint] = useState(false);
  const { searchText } = useSelector(selectSearch);
  const dispatch = useDispatch<AppThunkDispatch>();

  const { register, handleSubmit } = useForm<Input>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      search: searchText,
    },
  });

  const onSubmit: SubmitHandler<Input> = (data) => {
    const url = BASE_URL + validate(data.search);
    dispatch(setSearchText(data.search));
    dispatch(fetchData(url));
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
            'name dead/alive female/male human/alien/cronenberg/humanoid/animal',
            'ex: rick male human alive',
            'ex: morty female',
          ]}
        />
      )}
    </div>
  );
};

export default SearchBar;
