import $ from 'jquery';
import 'jquery-validation';

import ReactDOM from 'react-dom';

import {browserHistory} from 'react-router';
import {Meteor} from 'meteor/meteor';
import {Bert} from 'meteor/themeteorchef:bert';

import getInputValue from './get-input-value';

const login = (comp) => {
  const email = getInputValue(comp.refs.emailAddress);
  const password = getInputValue(comp.refs.password);

  Meteor.loginWithPassword(email, password, (error) => {
    if(error)
      Bert.alert(error.reason, 'warning');
    else {
      Bert.alert('Logged in!', 'success');

      browserHistory.push('/home');
    }
  });
};

const validate = (comp) => {
  let ignoreOnce = false;
  $(comp.refs.signin).validate({
    rules: {
      emailAddress: {
        required: true,
        email: true
      },
      password: {
        required: true
      }
    },
    messages: {
      emailAddress: {
        required: 'An email address is required',
        email: 'Invalid Email Address'
      },
      password: {
        required: 'A password is required'
      }
    },
    submitHandler() {
      login(comp);
    },
    invalidHandler(event, validator) {
      comp.setState({
        emailError: validator.errorMap.hasOwnProperty('emailAddress'),
        passwordError: validator.errorMap.hasOwnProperty('password'),
        errorMessage: `${validator.numberOfInvalids()} ${validator.numberOfInvalids() === 1 ? 'error has' : 'errors have'} occurred`
      });

      ignoreOnce = true;
    },
    onkeyup() {
      if(ignoreOnce)
        return ignoreOnce = false;

      comp.setState({
        emailError: false,
        passwordError: false
      });

      return !ignoreOnce;
    }
  });
};

const handleLogin = ({component}) => {
  if(!_.isNull(component) && !_.isUndefined(component))
    validate(component);
  else
    throw new Error('No component provided in login options');
};

export {login, handleLogin};


