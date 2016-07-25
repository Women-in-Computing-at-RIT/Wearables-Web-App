import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

import AppNavigation from '../containers/navigation';
import {BaseFooter} from '../components/footer';

export const App = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired
  },
  render() {
    return <div>
      <AppNavigation />
      <div className="wrapper-footer">
        <Grid>
          { this.props.children }
        </Grid>
        <div className="push-footer"></div>
      </div>
      <BaseFooter />
      </div>;
  }
});
