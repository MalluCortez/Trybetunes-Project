import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    searchArtist: '',
    isDisabled: true,
  };

  VerificationSearchArtistButton = () => {
    const { searchArtist } = this.state;
    const minimumNumber = 2;
    const verificationArtistName = searchArtist.length < minimumNumber;
    this.setState({
      isDisabled: verificationArtistName,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      this.VerificationSearchArtistButton();
    });
  };

  render() {
    const { searchArtist, isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-artist-input">
            Nome da Banda ou Artista
            <input
              type="text"
              id="search-artist-input"
              data-testid="search-artist-input"
              name="searchArtist"
              value={ searchArtist }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            id="search-artist-button"
            disabled={ isDisabled }
            /* onClick={ } */
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
