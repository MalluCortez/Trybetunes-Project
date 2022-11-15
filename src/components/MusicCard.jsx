import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    isLoading: false,
    isChecked: false,
  };

  async componentDidMount() {
    const { trackId } = this.props;
    const responseApi = await getFavoriteSongs();
    this.setState({
      isChecked: responseApi.some((music) => music.trackId === trackId),
    });
  }

  handleFavoriteSong = async (event) => {
    const { music } = this.props;
    const { checked } = event.target;
    if (checked) {
      this.setState({
        isLoading: true,
      });
      await addSong(music);
      this.setState({
        isLoading: false,
        isChecked: true,
      });
    } else {
      this.setState({
        isLoading: true,
      });
      await removeSong(music);
      this.setState({
        isLoading: false,
        isChecked: false,
      });
    }
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, isChecked } = this.state;
    return (
      <div>
        {
          isLoading && <Loading />
        }
        { trackName }
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            checked={ isChecked }
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleFavoriteSong }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
  music: PropTypes.shape({
    collectionName: PropTypes.string,
  }).isRequired,
};

export default MusicCard;
