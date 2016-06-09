import {Notifications} from './notifications';
import Schemas from '../../modules/schemas';

import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';

const pushGlobalNotifications = new ValidatedMethod({
  name: 'notifications.global.push',
  validate: new SimpleSchema({
    timestamp: Schemas.Notification.timestamp,
    type: Schemas.Notification.type,
    data: Schemas.Notification.data
  }).validator(),
  run({timestamp, type, data}) {
    Meteor.users.find().fetch().forEach(({_id}) => {
      Notifications.insert({timestamp: timestamp, type: type, data: data, targetId: _id});
    });
  }
});

export {pushGlobalNotifications};
