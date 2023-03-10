
import PropTypes from 'prop-types';
import {
  SearchbarContainer,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';

export const Searchbar =({onSubmit}) => {

 const [search, setSearch] = useState('')


 const searchResult = e =>{
  setSearch(e.currentTarget.value)
};

const handleSubmit = e => {
  e.preventDefault();

  onSubmit(search);
  setSearch('')
};


return (

  <SearchbarContainer>
  <SearchForm onSubmit={handleSubmit}>
    <SearchFormBtn type="submit"> <BsSearch/>
      <SearchFormBtnLabel>Search</SearchFormBtnLabel>
    </SearchFormBtn>

    <SearchFormInput
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      value={search}
      onChange={searchResult}
    />
  </SearchForm>
</SearchbarContainer>
);
};




Searchbar.propTypes ={
  onSubmit: PropTypes.func.isRequired,
};