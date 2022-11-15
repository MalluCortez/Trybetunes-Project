import React, { Component } from 'react';
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
              <h2 data-testid="header-user-name">
                { loggedUser.name }
              </h2>
            )
        }
      </header>
    );
  }
}

export default Header;
