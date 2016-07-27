import { Meteor } from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

import {Families} from '../families';

/*eslint-disable lodash/prefer-lodash-method*/
const FamilyPublications = {
  user: {
    all: 'families.all',
    select: 'families.select',
    fetchMembers: 'families.members',
    fetchRelated: 'families.related'
  }
};

if(Meteor.isServer) {
  Meteor.publish(FamilyPublications.user.all, () => {
    if(!this.userId)
      return this.ready();

    const familyIds = Meteor.users.findOne({_id: this.userId}).familyIds;
    return Families.find({_id: {$in: [...familyIds]}});
  });

  Meteor.publish(FamilyPublications.user.select, ({familyId, familyName}) => {
    if(!this.userId)
      return this.ready();

    if(_.isNil(familyId) && _.isNil(familyName)) {
      console.error("Both familyId and familyName undefined. One must be defined! (ID takes priority)");
      return this.ready();
    }

    new SimpleSchema({
      familyId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
      },
      familyName: {
        type: String,
        min: 6,
        max: 40,
      }
    }).validate({familyId, familyName});

    if(!_.isNil(familyId))
      return Families.findOne({_id: familyId});
    else
      return Families.findOne({familyName});
  });

  Meteor.publish(FamilyPublications.user.fetchMembers, (familyId) => {
    if(!this.userId)
      return this.ready();

    new SimpleSchema({
      familyId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
      }
    }).validate({familyId});

    const family = Families.findOne({_id: familyId});
    return Meteor.users.find({_id: {$in: family.userIds}});
  });

  Meteor.publish(FamilyPublications.user.fetchRelated, () => {
    if(!this.userId)
      return this.ready();

    const familyIds = Meteor.users.findOne({_id: this.userId}).familyIds;
    let related = Families.find({_id: {$in: familyIds}}).map((family) => family.userIds);
    related = _.flattenDeep(related);
    related = _.uniq(related);
    related = _.reject(related, (id) => id === this.userId);

    return Meteor.users.find({_id: {$in: related}});
  });
}

export {FamilyPublications};
/*eslint-enable lodash/prefer-lodash-method*/
