import React from 'react';
import {Modal, Button} from 'react-bootstrap';

import * as ChangeCase from 'change-case';

import {RegisterForm} from './forms/register-form';
import {SignInForm} from './forms/signin-form';
import {ForgotPasswordForm} from './forms/forgot-password-form';
import {Enum2} from '../../modules/enums';
import {Topics, EventBus} from '../../modules/subscriptions';

export class AuthState extends Enum2 {
  toString() {
    return ChangeCase.title(this.label.replace('_', ' '));
  }
}

AuthState.initEnum(['SIGN_IN', 'REGISTER', 'FORGOT_PASSWORD']);


export class AuthModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authState: this.props.authState, 
      prevAuthState: null, 
      show: false,
      subToken: null
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }
  
  componentDidMount() {
    this.setState({
      subToken: EventBus.subscribe(Topics.auth.modal, (m, n) => this.open(n))
    });
  }

  componentWillUnmount() {
    EventBus.unsubscribe(this.state.subToken);
    this.setState({
      subToken: null
    });
  }

  open(state) {
    if(_.isNull(state))
      this.close();
    else if(_.isUndefined(state) || !(state instanceof AuthState))
      this.setState({show: true});
    else {
      let lastState = this.state.authState;
      this.setState({show: true, authState: state, prevAuthState: lastState});
    }
  }

  close() {
    this.setState({show: false, prevAuthState: null});
  }

  renderAuthState() {
    const redirectToMain = (x) => this.open(_.isUndefined(x) ? AuthState.SIGN_IN : x);

    switch(this.state.authState) {
      case AuthState.SIGN_IN:
            return <SignInForm authModalCallback={this.open}/>;
      case AuthState.REGISTER:
            return <RegisterForm authModalCallback={redirectToMain}/>;
      case AuthState.FORGOT_PASSWORD:
            return <ForgotPasswordForm authModalCallback={redirectToMain} />;
      default:
            return <SignInForm authModalCallback={this.open}/>;
    }
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.authState.toString()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderAuthState()}
        </Modal.Body>
      </Modal>
    );
  }
}

AuthModal.propTypes = {
  authState: React.PropTypes.instanceOf(AuthState)
};

AuthModal.defaultProps = {
  authState: AuthState.SIGN_IN
};
