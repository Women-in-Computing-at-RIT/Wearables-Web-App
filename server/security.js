_ = lodash;

import {Security} from 'meteor/ongoworks:security';

import Schemas from '../imports/modules/schemas';
import {Families} from '../imports/api/index';

// Validates that a user is actually a member of that family
Security.defineMethod('ifMember', {
  fetch: [],
  tansform: null,
  allow(type, arg, userId, doc) {
    return Schemas.Family.validate(doc) && _.includes(doc.userIds, userId);
  }
});

Families.permit(['insert']).ifLoggedIn();
Families.permit(['update', 'delete']).ifLoggedIn().ifMember();
