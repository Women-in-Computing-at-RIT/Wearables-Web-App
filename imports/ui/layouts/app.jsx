import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

import AppNavigation from '../containers/navigation';

export const App = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired
  },
  render() {
    return <div>
        <AppNavigation />
        <Grid>
          { this.props.children }
        </Grid>
      <footer class="footer">
        <div class="container">
          <hr/>
          <Row>
            <Col xs={4}>
              <h5 class="text-muted text-center">Copyright @ 2016</h5>
            </Col>
            <Col xs={4}>
              <Link class="text-muted text-center" to="/contact">Contact Us</Link>
              <h5>contact@info.com</h5>
            </Col>
          </Row>
        </div>
      </footer>
      </div>;
  }
});
