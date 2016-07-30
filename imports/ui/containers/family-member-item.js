import {Meteor} from 'meteor/meteor';

import {composeWithTracker} from 'react-komposer';

import {RelationshipPublications} from '../../api/relationships/publications';
import {Relationships} from '../../api/relationships/relationships';
import {FamilyRelationship} from '../../modules/enums';

import {FamilyMemberItem} from '../components/family-member-item';
import {Loading} from '../components/loading';

const composer = (props, onData) => {
  const fromUser = props.rootUser;
  const toUser = props.tagetUser;

  if(_.isNil(fromUser)) {
    onData(null, {relationship: FamilyRelationship.FAMILY});
  } else {
    const sub = Meteor.subscribe(RelationshipPublications.select, props.targetUser);

    if (sub.ready()) {
      const relationship = Relationships.findOne({fromId: fromUser.id, toId: toUser.id}).relationshipType;
      onData(null, {relationship});
    }
  }
};

export default composeWithTracker(composer, Loading)(FamilyMemberItem);
