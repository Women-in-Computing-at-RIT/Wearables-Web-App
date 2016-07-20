import {Notifications} from './notifications';
import {Schemas} from '../../modules/schemas';

import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';

const pushGlobalNotification = new ValidatedMethod(
  {
    name: 'notifications.global',
    validate: Schemas.GlobalNotification.validator(),
    run: ({timestamp, type, data}) => {
      Meteor.users.find().fetch().forEach(({_id}) => //eslint-disable-line lodash/prefer-lodash-method
        Notifications.insert({timestamp: timestamp, type: type, data: data, targetId: _id})
      );
    }
  }
);

const pushNotification = new ValidatedMethod(
  {
    name: 'notifications.push',
    validate: Schemas.Notification.validator(),
    run: ({timestamp, type, data, targetId}) => {
      let user = Meteor.users.findOne(targetId);

      if(!_.isNil(user))
        Notifications.insert({timestamp: timestamp, type: type, data: data, targetId: targetId});
      else
        throw new Meteor.Error('no-matching-user', `${targetId} does not match any known User ID!`);
    }
  }
);

export {pushGlobalNotification, pushNotification};
