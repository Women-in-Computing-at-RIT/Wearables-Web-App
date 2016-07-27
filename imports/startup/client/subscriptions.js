import {FamilyPublications} from '/imports/api/families/server/publications';
import {NotifPublications} from '/imports/api/notifications/server/publications';
import {RelationshipPublications} from '/imports/api/relationships/server/publications';

import {Meteor} from 'meteor/meteor';

if(Meteor.isClient) {
  Meteor.subscribe(FamilyPublications.user.fetchRelated);
  Meteor.subscribe(NotifPublications.user.all);
  Meteor.subscribe(RelationshipPublications.all);
}
