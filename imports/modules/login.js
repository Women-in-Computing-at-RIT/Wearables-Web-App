import $ from 'jquery';
import 'jquery-validation';

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

      const {location} = comp.props;
      if(location.state && location.state.nextPathname)
        browserHistory.push(location.state.nextPathname);
      else
        browserHistory.push('/');
    }
  });
};

const validate = (comp) => {
  $(comp.refs.signin).validate({
    rules: {
      email: {
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


