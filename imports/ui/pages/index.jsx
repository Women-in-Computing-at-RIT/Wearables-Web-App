/**
 * file: index.jsx
 * authors: Matthew Crocco, Cara Steinberg
 */

import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

import {AuthState} from '../components/auth-modal';
import {EventBus, Topics} from '../../modules/utility/subscriptions';

const styles = {maxWidth: 500};
export class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Jumbotron className="text-center">
      <h2>Welcome!</h2>
      <p>Lorem ipsum sit amet dolor asent</p>
      <Button className="btn-lg center-block" block style={styles} onClick={() => EventBus.publish(Topics.auth.modal, AuthState.SIGN_IN)}>Sign In</Button>
      <Button className="btn-lg center-block" block style={styles} onClick={() => EventBus.publish(Topics.auth.modal, AuthState.REGISTER)}>Register</Button>
    </Jumbotron>);
  }
}

