import {FamilyPublications} from '/imports/api/families/publications';
import {NotifPublications} from '/imports/api/notifications/publications';

import {Meteor} from 'meteor/meteor';

if(Meteor.isClient) {
  RelatedFamilySubscription = Meteor.subscribe(FamilyPublications.user.fetchRelated);
  AllNotificationSubscription = Meteor.subscribe(NotifPublications.user.all);
}
