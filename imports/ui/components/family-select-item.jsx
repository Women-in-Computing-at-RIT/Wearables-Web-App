import {SimpleSchema} from 'meteor/aldeed:simple-schema';

import React from 'react';

import Schemas from '../../modules/schemas';
import {Custom} from '../../modules/utility/type-checking';
import {UserAccess} from '../../modules/utility/user-utils';

export class FamilyItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {currentSelection: Meteor.userId()};
  }

  componentDidUpdate(prevProps, prevState) {
    // On state change, signal that a selection change was made
    // TODO Consider using PubSub
    if(prevState.currentSelection !== this.state.currentSelection)
      this.props.onSelect(null, new UserAccess(this.state.currentSelection));
  }

  makeSelection() {

  }

  render() {
    const family = this.props.familyObject;

    return (
      <div>

      </div>
    );
  }

}

FamilyItem.propTypes = {
  onSelect: React.PropTypes.func.isRequired,
  family: React.PropTypes.oneOfType([
    Custom.PropTypes.meteorId,
    React.PropTypes.shape({
      familyName: React.PropTypes.string.isRequired,
      user: React.PropTypes.instanceOf(UserAccess).isRequired
    })
  ]).isRequired,
  familyObject: Custom.PropTypes.schema(Schemas.Family)
};
