import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

import Schemas from '../../modules/schemas';

/* eslint-disable lodash/prefer-lodash-method */
export const Families = new Mongo.Collection('families');

Families.attachSchema(Schemas.Family);

Families.helpers({
  getMembers() {
    return Meteor.users.find({_id: {$in: this.userIds}});
  }
});

/* eslint-enable */
