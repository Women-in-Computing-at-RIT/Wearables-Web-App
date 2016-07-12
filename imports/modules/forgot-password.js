import $ from 'jquery';
import 'jquery-validation';

import ReactDOM from 'react-dom';

import {Meteor} from 'meteor/meteor';
import {Bert} from 'meteor/themeteorchef:bert';

import {EmailErrors} from './constants';
import getInputValue from './get-input-value';

import {EmailType} from './enums';
import {UserAccess} from './user-utils';

import * as UserApi from '../api/users/methods';

const forgotPassword = (comp) => {
  const email = getInputValue(comp.refs.email);

  UserApi.sendEmailToUserByEmailMethod.call({
    email: email,
    emailType: EmailType.FORGOT_PASSWORD
  }, (sendError) => {
    if(_.isNil(sendError)) {
      Bert.alert(`Email successfully sent to ${email}.`, 'success');
    } else {
      Bert.alert(`Could not send email: ${sendError} : ${sendError.reason}.`, 'danger');
      console.info(sendError.stack);
    }
  });
};

const validate = (comp) => {
  let ignoreOnce;
  $(ReactDOM.findDOMNode(comp.refs.forgotPassword)).validate({
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
      }
    },
    errors: {
      email: {
        required: EmailErrors.required,
        email: EmailErrors.invalid
      }
    },
    submitHandler() {
      forgotPassword(comp);
    },
    invalidHandler(event, validator) {
      comp.setState({
        emailError: validator.errorMap.hasOwnProperty('email'),
        errorMessage: `${validator.numberOfInvalids()} ${validator.numberOfInvalids() === 1 ? 'error has' : 'errors have'} occurred`
      });

      ignoreOnce = true;
    },
    onkeyup() {
      if(ignoreOnce)
        return ignoreOnce = false;

      comp.setState({
        emailError: false
      });

      return !ignoreOnce;
    }
  });
};

const handleForgotPassword = ({component}) => {
  if(!_.isNil(component))
    return validate(component);
  else
    throw new Error('No component provided to register options');
};

export {handleForgotPassword};
