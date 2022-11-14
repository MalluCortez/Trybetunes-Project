import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  state = {
    loginName: '',
    isSaveButtonDisabled: true,
    itsLoading: false,
  };

  VericationButton = () => {
    const { loginName } = this.state;
    const minimumNumber = 3;
    const verificationName = loginName.length < minimumNumber;
    this.setState({
      isSaveButtonDisabled: verificationName,
    });
  };

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      this.VericationButton();
    });
  };

  onSaveButtonClick = async () => {
    const { loginName } = this.state;
    const { history } = this.props;
    this.setState({
      itsLoading: true,
    });
    await createUser({ name: loginName });
    history.push('/search');
  };

  render() {
    const { loginName, isSaveButtonDisabled, itsLoading } = this.state;
    return (
      <div data-testid="page-login">
        {
          itsLoading
            ? <Loading />
            : (
              <form>
                <label htmlFor="name-input">
                  Nome
                  <input
                    type="text"
                    id="login-name-input"
                    data-testid="login-name-input"
                    name="loginName"
                    value={ loginName }
                    onChange={ this.onInputChange }
                  />
                </label>
                <button
                  type="button"
                  data-testid="login-submit-button"
                  id="login-submit-button"
                  disabled={ isSaveButtonDisabled }
                  onClick={ this.onSaveButtonClick }
                >
                  Entrar
                </button>
              </form>
            )
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
