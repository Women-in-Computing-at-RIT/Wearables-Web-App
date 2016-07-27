_ = lodash;

import {Meteor} from 'meteor/meteor';
import {Security} from 'meteor/ongoworks:security';

import Schemas from '../imports/modules/schemas';
import {Api} from '../imports/modules/constants';
import {Families, Notifications, Relationships} from '../imports/api/index';

// Validates that a user is actually a member of that family
Security.defineMethod('ifMember', {
  fetch: [],
  transform: null,
  allow(type, arg, userId, doc) {
    return Schemas.Family.validate(doc) && _.includes(doc.userIds, userId);
  }
});

Security.defineMethod('ifPartOf', {
  fetch: [],
  transform: null,
  allow(type, arg, userId, doc) {
    return doc.to === userId || doc.from === userId;
  }
});

Security.defineMethod('isSelf', {
  fetch: [],
  transform: null,
  allow(type, arg, userId, doc) {
    return doc._id === userId;
  }
});

Families.permit(['insert']).ifLoggedIn();
Families.permit(['update', 'delete']).ifLoggedIn().ifMember();

Notifications.permit(['insert', 'update', 'delete']).ifLoggedIn();

Relationships.permit(['insert']).ifLoggedIn();
Relationships.permit(['update', 'delete']).ifLoggedIn().ifPartOf();
Relationships.permit(['update', 'delete']).ifLoggedIn().ifHasRole('admin');

Meteor.users.permit(['update']).ifLoggedIn().ifHasRole('admin');
Meteor.users.permit(['update']).ifLoggedIn().isSelf().onlyProps('profile', Api.all.userObjRoot);
Meteor.users.permit(['delete']).ifLoggedIn().ifHasRole('admin');
Meteor.users.permit(['delete']).ifLoggedIn().isSelf();
