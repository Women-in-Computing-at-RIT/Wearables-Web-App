/**
 * Created by Matthew on 6/26/2016.
 */

import React from 'react';
import {Collapse, Alert, FormGroup, ButtonGroup, Button, ControlLabel, FormControl, Pager, PageItem} from 'react-bootstrap';

import {handleForgotPassword} from '../../modules/forgot-password';

export class ForgotPasswordForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {emailError: false, errorMessage: null};
  }

  componentDidMount() {
    handleForgotPassword({component: this});
  }

  render() {
    let swapCallback = this.props.authModalCallback;
    return (
      <form ref="forgotPassword" className="forgotPassword" onsubmit={ (e) => e.preventDefault() }>
        <FormGroup id="emailGroup" {...(this.state.emailError ? {validationState: 'error'} : {})}>
          <ControlLabel className="pull-left">Email Address</ControlLabel>
          <FormControl
            type="email"
            ref="email"
            name="email"
            id="email"
            placeholder="Email Address"
          />
          <FormControl.Feedback />
        </FormGroup>
        <Pager>
          <PageItem next onClick={() => swapCallback()}>Sign in</PageItem>
        </Pager>
        <ButtonGroup justified>
          <ButtonGroup>
            <Button type="submit" bsStyle="primary" >Submit</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button onClick={() => swapCallback(null)}>Close</Button>
          </ButtonGroup>
        </ButtonGroup>
      </form>
    );
  }
}

ForgotPasswordForm.propTypes = {
  authModalCallback: React.PropTypes.func.isRequired
};
