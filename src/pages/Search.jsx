import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    responseInfos: [],
    searchArtist: '',
    artistName: '',
    isDisabled: true,
    itsLoading: false,
    clickButton: false,
    hasAlbum: false,
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

  onSearchButton = async () => {
    const { searchArtist } = this.state;
    const responseObject = await searchAlbumsAPI(searchArtist);
    if (responseObject.length > 0) {
      this.setState({
        responseInfos: responseObject,
        artistName: searchArtist,
        searchArtist: '',
        itsLoading: false,
        hasAlbum: true,
      });
    }
    this.setState({ itsLoading: true, clickButton: true });
  };

  render() {
    const { searchArtist, isDisabled, itsLoading, responseInfos,
      artistName, clickButton, hasAlbum } = this.state;
    return (
      <section>
        <div data-testid="page-search">
          <Header />
          {
            itsLoading
              ? <Loading />
              : (
                <section>
                  <form>
                    <label htmlFor="search-artist-input">
                      Nome da Banda ou Artista
                      <input
                        type="text"
                        placeholder="Nome do Artista"
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
                      onClick={ this.onSearchButton }
                    >
                      Pesquisar
                    </button>
                  </form>
                </section>
              )
          }
        </div>
        { (hasAlbum)
          && (
            <p>{ `Resultado de álbuns de: ${artistName}`}</p>
          )}
        {
          (responseInfos.length === 0 && clickButton === true)
            && <p>Nenhum álbum foi encontrado</p>
        }
        {
          responseInfos.map((info) => (
            <ul key={ info.collectionId }>
              <li>
                <img src={ info.artworkUrl100 } alt={ info.collectionName } />
              </li>
              <li>{ info.collectionName }</li>
              <li>{ info.artistName }</li>
              <Link
                data-testid={ `link-to-album-${collectionId}` }
                to={ `/album/${info.collectionId}` }
              >
                Album
              </Link>
            </ul>
          ))
        }
      </section>
    );
  }
}

export default Search;
