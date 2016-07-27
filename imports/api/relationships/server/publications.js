import {Meteor} from 'meteor/meteor';
import {Relationships} from '../relationships';

export const RelationshipPublications = {
  all: 'relationship.all',
  select: 'relationship.select'
};

if(Meteor.isServer) {

  /* eslint-disable lodash/prefer-lodash-method*/
  Meteor.publish(RelationshipPublications.all, () => {
    if(!this.userId)
      return this.ready();

    let relationships = Relationships.find({$or: [{toId: this.userId}, {fromId: this.userId}]}).fetch();
    return _(relationships).map((u) => {
      if(u.fromId === this.userId)
        [u.toId, u.fromId] = [u.fromId, u.toId];

      return u;
    }).uniq().value();
  });
  /* eslint-enable */

  Meteor.publish(RelationshipPublications.select, (withId) => {
    if(!this.userId)
      return this.ready();

    new SimpleSchema({
      withId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
      }
    }).validate({withId});

    return Relationships.findOne({fromId: this.userId, toId: withId});
  });
}
