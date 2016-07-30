import React from 'react';
import {} from 'react-bootstrap';

import * as ChangeCase from 'change-case';

import {UserAccess} from '../../modules/utility/user-utils';
import {FamilyRelationship} from '../../modules/enums';

export class FamilyMemberItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {selected: _.defaultTo(this.props.primary, false)};
  }

  render() {
    const user = this.props.targetUser;
    const relatedTo = this.props.rootUser;
    const relationship = ChangeCase.title(this.props.relationship.name);

    const isPrimary = this.state.selected;

    return (
      <div>

      </div>
    );
  }
}

FamilyMemberItem.propTypes = {
  targetUser: React.PropTypes.instanceOf(UserAccess).isRequired,
  rootUser: React.PropTypes.instanceOf(UserAccess),
  relationship: React.PropTypes.instanceOf(FamilyRelationship),
  primary: React.PropTypes.bool
};
