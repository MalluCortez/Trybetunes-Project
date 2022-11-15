import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  state = {
    loggedUser: { },
    itsLoading: true,
  };

  componentDidMount() {
    this.ShowName();
  }

  ShowName = async () => {
    const ObjectUser = await getUser();
    console.log(ObjectUser);
    this.setState({
      loggedUser: ObjectUser,
      itsLoading: false,
    });
  };

  render() {
    const { loggedUser, itsLoading } = this.state;
    return (
      <header data-testid="header-component">
        {
          itsLoading
            ? <Loading />
            : (
              <div>
                <h2 data-testid="header-user-name">{ loggedUser.name }</h2>
                <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
                <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
                <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
              </div>
            )
        }
      </header>
    );
  }
}

export default Header;
