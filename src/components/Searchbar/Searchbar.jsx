import React, { useState } from 'react';
import Notiflix from 'notiflix';
import styles from './Searchbar.module.css';

const Searchbar = ({ onSubmitHandler }) => {
  const [name, setName] = useState('');

  const handleChange = event => {
    const { value } = event.currentTarget;
    setName(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (name.trim() === '') {
      Notiflix.Notify.failure('search string is empty!');
      return;
    }

    onSubmitHandler({ name });

    reset();
  };

  const reset = () => {
    setName('');
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchFormButton}>
          <span className={styles.SearchFormButtonLabel}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20 20">
              <title>search</title>
              <path d="M19 17l-5.15-5.15a7 7 0 1 0-2 2L17 19zM3.5 8A4.5 4.5 0 1 1 8 12.5 4.5 4.5 0 0 1 3.5 8z" />
            </svg>
          </span>
        </button>

        <input
          className={styles.SearchFormInput}
          type="text"
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={name}
        />
      </form>
    </header>
  );
};

export default Searchbar;