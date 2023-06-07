import React, { useState } from "react"
import Svg from './SearchSvg'
import PropTypes from 'prop-types';

export default function Searchbar({onSubmit}) {
  const[value, setValue] = useState('')

  const handleOnChange = e => {
    const {value} = e.currentTarget
    setValue(value)
  };

  const onSubmitForm = e => {
    e.preventDefault();
    onSubmit(value);
    reset();
  };

  const reset = () => {
    setValue('')
  }

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmitForm}>
        <button type="submit" className="SearchForm-button">
          <Svg className="SearchForm-button-label"/>
        </button>
        
        <input
          className="SearchForm-input"
          type="text"
          style={{autocomplete: 'off', autofocus: 'true'}}
          placeholder="Search images and photos"
          value={value}
          onChange={handleOnChange}
        />
      </form>
    </header>
  )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};