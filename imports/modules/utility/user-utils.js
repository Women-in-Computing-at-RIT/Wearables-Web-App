import {Bert} from 'meteor/themeteorchef:bert';

import * as ChangeCase from 'change-case';
import * as UserApi from '../../api/users/methods';


const getUserFullName = (user) => `${user.profile.firstName} ${user.profile.lastName}`;

const getUserEmail = (user, index = 0) => user.emails[index].address;

const defaultSendErrorHandler = (sendError, email) => {
  if(!_.isNil(sendError)) {
    Bert.alert(sendError.reason, 'danger');
  } else {
    Bert.alert(`Registration successful! Verification email set to ${email}.`, 'success');
  }
};

class UserAccess {
  
  constructor(user) {
    this.user = user;
  }

  imageUrl(transformations = []) {
    return $.cloudinary.url(this.user.profile.profileImage, transformations);
  }

  get _id() {
    return this.user._id;
  }

  get id() {
    return this._id;
  }

  get nameAsTitle() {
    return ChangeCase.title(this.name);
  }

  get name() {
    return `${this.firstName} ${this.lastName}`;
  }

  get firstName() {
    return this.user.profile.firstName;
  }

  get lastName() {
    return this.user.profile.lastName;
  }

  get primaryEmail() {
    return this.email();
  }

  email(index = 0) {
    return this.user.emails[index].address;
  }
  
  sendEmail(emailType, cb) {
    UserApi.sendEmailToUserMethod.call({
      userId: this.user._id,
      emailType,
      email: this.primaryEmail
    }, (sendError) => {
        if(_.isNil(cb))
          return defaultSendErrorHandler(sendError, this.primaryEmail);
        else
          return cb(sendError, this.primaryEmail);
    });
  }
  
}

export {UserAccess, getUserFullName, getUserEmail};
