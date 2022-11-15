import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    musics: [],
    artistName: '',
    albumName: '',
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getMusicsApi(id);
  }

  getMusicsApi = async (id) => {
    const request = await getMusics(id);
    this.setState({
      musics: request,
      artistName: request[0].artistName,
      albumName: request[0].collectionName,
    });
  };

  render() {
    const { musics, artistName, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h3 data-testid="artist-name">{ artistName }</h3>
        <h3 data-testid="album-name">{ albumName }</h3>
        <div>
          {
            musics.slice(1).map((music) => (
              /* console.log(music); */
              <div key={ music.trackId }>
                <MusicCard
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
                  music={ music }
                />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
