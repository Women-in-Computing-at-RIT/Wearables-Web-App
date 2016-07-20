import React from 'react';

import {UserAccess} from '../../modules/utility/user-utils';

export class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const user = new UserAccess(this.props.user);

    return (
      <div className="card">
        <img className="card-img-top" data-src="" />
        <div className="card-block">
          <h4 className="card-title">{user.nameAsTitle}</h4>
          <p className="card-text">This is just a test card</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
        <div className="card-block">
          <a href="#" className="card-link">Card link</a>
          <a href="#" className="card-link">Another link</a>
        </div>
      </div>
    );
  }
}

ProfileCard.propTypes = {
  user: React.PropTypes.object.isRequired
};
