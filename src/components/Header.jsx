import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  state = {
    loggedUser: { },
    itsLoading: false,
  };

  componentDidMount() {
    this.ShowName();
  }

  ShowName = async () => {
    this.setState({
      itsLoading: true,
    });
    const ObjectUser = await getUser();
    this.setState({
      loggedUser: ObjectUser,
    });
    this.setState({
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
