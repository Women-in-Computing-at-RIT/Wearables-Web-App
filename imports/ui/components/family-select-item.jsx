import {SimpleSchema} from 'meteor/aldeed:simple-schema';

import React from 'react';

import Schemas from '../../modules/schemas';

import {Custom} from '../../modules/utility/type-checking';
import {UserAccess} from '../../modules/utility/user-utils';
import {EventBus} from '../../modules/utility/pubsub';

import {Topics} from '../../modules/constants';
import {Families} from '../../api/families/families';

/**
 * Represents an item in the Family Select component. The Select component represents any number of families a
 * user may be part of. Each FamilyItem represents an individual family and it's members (the members themselves being
 * represented by FamilyMemberItems).
 *
 * Family Select is the container around FamilyItems which contain Family Members.
 *
 * Events handled are simply the selection of family members which determines data displayed on the page.
 */
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

  componentWillMount() {
    let tempFamily;
    if(Custom.PropTypes.schema.isValid(this.props.family))
      tempFamily = this.props.family;
    else
    if(Custom.PropTypes.meteorId.isValid(this.props.family))
      tempFamily = Families.findOne({_id: this.props.family});
    else
      tempFamily = Families.findOne({familyName: this.props.family.familyName, userIds: this.props.family.user.id});

    this.props.family = tempFamily;
  }

  componentDidMount() {
    EventBus.publish(Topics.ui.userSelected, {id: this.state.currentSelection});
  }

  makeSelection() {

  }

  render() {
    const family = tempFamily;

    return (
      <div>

      </div>
    );
  }

}

FamilyItem.propTypes = {
  active: React.PropTypes.bool.isRequired,                    // Simplified display when inactive, members cannot be chosen
  onMemberSelected: React.PropTypes.func.isRequired,          // Called when active member is changed, determines whose data is displayed on the page
  family: React.PropTypes.oneOfType([                         // Family to represent
    Custom.PropTypes.meteorId,
    React.PropTypes.shape({
      familyName: React.PropTypes.string.isRequired,
      user: React.PropTypes.instanceOf(UserAccess).isRequired
    }),
    Custom.PropTypes.schema(Schemas.Family)
  ]).isRequired
};
