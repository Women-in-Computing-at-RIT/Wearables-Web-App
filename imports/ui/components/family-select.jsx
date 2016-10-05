import React from 'react';

import {Custom} from '../../modules/utility/type-checking';
import {UserAccess} from '../../modules/utility/user-utils';
import {EventBus} from '../../modules/utility/pubsub';
import {Topics} from '../../modules/constants';

export class FamilySelect extends React.Component {
  constructor(props) {
    super(props);
  }


}

FamilySelect.propTypes = {
  user: React.PropTypes.oneOfType([
    Custom.PropTypes.meteorId,
    React.PropTypes.instanceOf(UserAccess)
  ]).isRequired
};
