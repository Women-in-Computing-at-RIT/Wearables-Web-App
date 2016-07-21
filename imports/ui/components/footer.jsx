
import React from 'react';

import {Row, Col, Grid} from 'react-bootstrap';
import {Link} from 'react-router';

import {Routes} from '../../modules/constants';


export const BaseFooter = () => (
  <footer className="footer">
    <Grid fluid={true}>
      <Row>
        <Col xs={4}>
          <h5 className="text-muted text-center">Copyright (c) 2016 WiC Wearable Developers</h5>
        </Col>
        <Col xs={4}>
          <Link className="text-muted text-center" to={Routes.contact}>Contact Us</Link>
          <h5 className="text-muted text-center">contact@info.com</h5>
        </Col>
      </Row>
    </Grid>
  </footer>
);
