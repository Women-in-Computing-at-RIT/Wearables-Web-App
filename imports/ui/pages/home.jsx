/**
 * file: homePage.jsx
 * authors: Cara Steinberg, Matthew Crocco
 */
import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import {ProfileCard} from '../../ui/components/profile-card';

export class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Grid fluid={true}>
        {/* Grid A (Spanning All Content) */}
        <Row>
          {/* Profile Card Area */}
          <Col xs={4}>
            <ProfileCard user={Meteor.user()}/>
          </Col>
          <Col xs={8}>
            {/* Grid B Containing Family Info and Statistical Data */}
            <Grid fluid={true}>
              <Row>

              </Row>
              <Row>

              </Row>
            </Grid>
          </Col>
        </Row>
      </Grid>
    );
  }
}
