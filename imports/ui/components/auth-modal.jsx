import React from 'react';
import {Modal, Button} from 'react-bootstrap';

import * as ChangeCase from 'change-case';
import PubSub from 'pubsub-js';

import {RegisterForm} from './register-form';
import {SignInForm} from './signin-form';
import {Enum2} from '../../modules/enums';
import {AUTH_MODAL_TOPIC} from '../../modules/subscriptions';

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
      subToken: PubSub.subscribe(AUTH_MODAL_TOPIC, (m, n) => this.open(n))
    });
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.state.subToken);
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
    switch(this.state.authState) {
      case AuthState.SIGN_IN:
            return <SignInForm swapCallback={this.open}/>;
      case AuthState.REGISTER:
            return <RegisterForm swapCallback={() => this.open(AuthState.SIGN_IN)}/>;
      case AuthState.FORGOT_PASSWORD:
            return <RegisterForm swapCallback={() => this.open(this.state.prevAuthState)} />;
      default:
            return <SignInForm swapCallback={this.open}/>;
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
