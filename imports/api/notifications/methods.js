import {Notifications} from './notifications';
import Schemas from '../../modules/schemas';
import createSided from '../../modules/sided-function';
import {Supplier} from '../../modules/fp';

import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';

export const pushGlobalNotification = createSided(new Supplier(() => pushGlobalNotificationMethod),
  ({timestamp, type, data}) => Meteor.users.find().fetch().forEach(({_id}) =>
    Notifications.insert({timestamp: timestamp, type: type, data: data, targetId: _id})));

export const pushNotification = createSided(new Supplier(() => pushNotificationMethod),
  ({timestamp, type, data, targetId}) => {
    let user = Meteor.users.findOne(targetId);

    if(!_.isUndefined(user) && !_.isNull(user))
      Notifications.insert({timestamp: timestamp, type: type, data: data, targetId: targetId});
    else
      throw new Meteor.Error('no-matching-user', `${targetId} does not match any known User ID!`);
});

const pushGlobalNotificationMethod = new ValidatedMethod(
  {
    name: 'notifications.global',
    validate: new SimpleSchema({
      timestamp: Schemas.Notification.timestamp,
      type: Schemas.Notification.type,
      data: Schemas.Notification.data
    }).validator(),
    run: pushGlobalNotification
  }
);

const pushNotificationMethod = new ValidatedMethod(
  {
    name: 'notifications.push',
    validate: Schemas.Notification.validator(),
    run: pushNotification
  }
);

export {pushGlobalNotificationMethod, pushNotificationMethod};
