import $ from 'jquery';
import 'jquery-validation';

import {browserHistory} from 'react-router';
import {Meteor} from 'meteor/meteor';
import {Bert} from 'meteor/themeteorchef:bert';

import {EmailErrors, PasswordErrors} from '../constants';
import getInputValue from '../utility/get-input-value';

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
  let ignoreOnce;
  $(comp.refs.signin).validate({
    errorClass: 'has-error',
    validClass: 'has-success',
    wrapper: 'div',
    errorPlacement(label, element) {
      label.addClass('alert alert-danger validation-alert');
      label.attr('role', 'alert');
      label.insertAfter(element);
    },
    rules: {
      emailAddress: {
        required: true,
        email: true
      },
      password: {
        required: true
      }
    },
    errors: {
      emailAddress: {
        required: EmailErrors.required,
        email: EmailErrors.invalid
      },
      password: {
        required: PasswordErrors.required
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
  if(!_.isNil(component))
    validate(component);
  else
    throw new Error('No component provided in login options');
};

const isLoggedIn = () => Meteor.loggingIn() || Meteor.userId();

export {login, handleLogin, isLoggedIn};


