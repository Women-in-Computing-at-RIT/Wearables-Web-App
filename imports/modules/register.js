import $ from 'jquery';
import 'jquery-validation';

import {browserHistory} from 'react-router';

import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Bert} from 'meteor/themeteorchef:bert';

import * as UserApi from '../api/users/methods';

import {EmailMessages, PasswordMessages} from '../modules/strings';

import getInputValue from './get-input-value';


const isEmailAvailable = (email) => {
  if(_.isNil(email) || !_.isString(email))
    throw new Error(`email is nil or not a string: ${email}`);

  return UserApi.isEmailAvailable(email);
};

const isRegistered = (userId) => {
  if(_.isNil(userId) || !_.isString(userId))
    throw new Error(`userId is nil or not a string: ${userId}`);

  return UserApi.isUserRegistered({userId});
};

const register = (component) => {
  const [email, password] = [getInputValue(component.refs.email), getInputValue(component.refs.password)];

  Accounts.createUser({email, password}, (error) => {
    if(!_.isNil(error)){
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert(`Registration successful! Verification email set to ${email}.`, 'success');
      Accounts.sendVerificationEmail(Meteor.userId(), email);
      browserHistory.push('/home');
    }
  });
};

const validate = (component) => {
  let ignoreOnce;
  $(component.refs.registration).validate({
    rules: {
      email: {
        required: true,
        email: true
      },
      password: {
        required: true
      },
      passwordConfirmation: {
        required: true,
        equalTo: "#password"
      }
    },
    messages: {
      email: {
        required: EmailMessages.required,
        email: EmailMessages.invalid
      },
      password: {
        required: PasswordMessages.required
      },
      passwordConfirmation: {
        required: PasswordMessages.required,
        equalTo: PasswordMessages.mismatch
      }
    },
    submitHandler() {
      register(component);
    },
    invalidHandler(event, validator) {
      component.setState({
        emailError: validator.errorMap.hasOwnProperty('email'),
        passwordError: validator.errorMap.hasOwnProperty('password'),
        mismatchError: validator.errorMap.hasOwnProperty('passwordConfirmation'),
        errorMessage: `${validator.numberOfInvalids()} ${validator.numberOfInvalids() === 1 ? 'error has' : 'errors have'} occurred`
      });

      ignoreOnce = true;
    },
    onkeyup() {
      if(ignoreOnce)
        return ignoreOnce = false;

      component.setState({
        emailError: false,
        passwordError: false,
        mismatchError: false
      });

      return !ignoreOnce;
    }
  });
};

const handleRegister = ({component}) => {
  if(!_.isNil(component))
    return validate(component);
  else
    throw new Error('No component provided to register options');
};

export {isEmailAvailable, isRegistered, handleRegister};
