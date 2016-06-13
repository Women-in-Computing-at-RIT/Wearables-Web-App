/**
 * file: index.jsx
 * authors: Matthew Crocco, Cara Steinberg
 */

import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import {SignInModal} from '../components/signInModal';
import {RegisterModal} from '../components/registerModal';

const styles = {maxWidth: 500};
export const Index = () =>
  <Jumbotron className="text-center">
    <h2>Welcome!</h2>
    <p>Lorem ipsum sit amet dolor asent</p>
    <Button className="btn-lg center-block" block style={styles}><SignInModal/></Button>
    <Button className="btn-lg center-block" block style={styles}><RegisterModal/></Button>
  </Jumbotron>;

