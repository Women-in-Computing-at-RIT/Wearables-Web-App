import $ from 'jquery';
import 'jquery-validation';
import zxcvbn from 'zxcvbn';

import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';

import {Accounts} from 'meteor/accounts-base';
import {Bert} from 'meteor/themeteorchef:bert';

import * as UserApi from '../api/users/methods';

import {UserAccess} from '../modules/user-utils';
import {EmailType} from '../modules/enums';
import {App, Topics, EmailErrors, PasswordErrors, ProfileErrors} from './constants';
import {EventBus} from '../modules/subscriptions';

import getInputValue from './get-input-value';


const isEmailAvailable = (email) => {
  if(_.isNil(email) || !_.isString(email))
    throw new Error(`email is nil or not a string: ${email}`);

  return UserApi.isEmailAvailableMethod.call({email});
};

const isRegistered = (userId) => {
  if(_.isNil(userId) || !_.isString(userId))
    throw new Error(`userId is nil or not a string: ${userId}`);

  return UserApi.isUserRegisteredMethod.call({userId});
};

const register = (component) => {
  const [email, password, firstName, lastName] = [
    getInputValue(component.refs.email),
    getInputValue(component.refs.password),
    getInputValue(component.refs.firstName),
    getInputValue(component.refs.lastName)
  ];

  let result = zxcvbn(password, [firstName, lastName, email, ...App.siteDictionary]);
  EventBus.publish(Topics.auth.passwordVerify, result);

  if(result.score < App.auth.minPwdStrength){
    Bert.alert(`${PasswordErrors.tooWeak}! ${result.feedback.warning}.`, 'danger');
    return;
  }

  Accounts.createUser({email, password, profile: {firstName, lastName}}, (error) => {
    if(!_.isNil(error)){
      Bert.alert(error.reason, 'danger');
    } else {
      const user = new UserAccess(Accounts.findUserByEmail(email));
      
      user.sendEmail(EmailType.VERIFY, (sendError, email) => {
        if(_.isNil(sendError)) {
          Bert.alert(`Registration successful! Verification email set to ${email}.`, 'success');
          browserHistory.push('/home');
        } else
          Bert.alert(sendError.reason, 'danger');
      });
    }
  });
};

const validate = (component) => {
  let ignoreOnce;
  $(ReactDOM.findDOMNode(component.refs.registration)).validate({
    errorClass: 'has-error',
    validClass: 'has-success',
    wrapper: 'div',
    errorPlacement(label, element) {
      label.addClass('alert alert-danger validation-alert');
      label.attr('role', 'alert');
      label.insertAfter(element);
    },
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
      },
      firstName: {
        required: true,
        rangelength: [1, 40]
      },
      lastName: {
        required: true,
        rangelength: [3, 40]
      }
    },
    errors: {
      email: {
        required: EmailErrors.required,
        email: EmailErrors.invalid
      },
      password: {
        required: PasswordErrors.required
      },
      passwordConfirmation: {
        required: PasswordErrors.required,
        equalTo: PasswordErrors.mismatch
      },
      firstName: {
        required: ProfileErrors.firstName.required,
        rangelength: ProfileErrors.firstName.rangelength
      },
      lastName: {
        required: ProfileErrors.lastName.required,
        rangelength: ProfileErrors.lastName.rangelength
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

      const [email, password, firstName, lastName] = [
        getInputValue(component.refs.email),
        getInputValue(component.refs.password),
        getInputValue(component.refs.firstName),
        getInputValue(component.refs.lastName)
      ];

      let result = zxcvbn(password, [firstName, lastName, email, ...App.siteDictionary]);
      EventBus.publish(Topics.auth.passwordVerify, result);

      ignoreOnce = true;
    },
    onkeyup() {
      if(ignoreOnce)
        return ignoreOnce = false;


      const [email, password, firstName, lastName] = [
        getInputValue(component.refs.email),
        getInputValue(component.refs.password),
        getInputValue(component.refs.firstName),
        getInputValue(component.refs.lastName)
      ];

      let {score, feedback: {warning, suggestions}} = zxcvbn(password, [firstName, lastName, email, ...App.siteDictionary]);
      component.setState({
        emailError: false,
        passwordError: false,
        mismatchError: false,
        passwordStrength: password.length === 0 ? -1 : score,
        passwordErrorMessage: password.length === 0 ? null : `${warning ? warning + '. ' : ''}${suggestions.length > 0 ? suggestions + '.' : ''}`
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
