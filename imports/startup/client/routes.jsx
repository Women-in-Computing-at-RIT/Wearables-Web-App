import React from 'react';

import {Tracker} from 'meteor/tracker';

import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {Meteor} from 'meteor/meteor';

import onlyIfVerified from '../../modules/only-if-verified';
import {isLoggedIn} from '../../modules/login';

import {App} from '../../ui/layouts/app';
import {Index} from '../../ui/pages/index';
import {CreateProfile} from '../../ui/pages/information';
import {NotFound} from '../../ui/pages/not-found';
import {ContactPage} from '../../ui/pages/contact';
import {ForgotPassword} from '../../ui/pages/forgot-password';
import {ResetPassword} from '../../ui/pages/reset-password';
import {HomePage} from '../../ui/pages/home';
import {ProfilePage} from '../../ui/pages/profile';
import {Schedule} from '../../ui/pages/schedule';
import {UnverifiedPage} from '../../ui/pages/unverified';

/**
 * An onEnter action that requires the user accessing that route to be authenticated. If the user is not authenticated
 * they are redirected to a login page. If a user is logged in but they are not a verified user
 * they are redirected to a page telling them they are unverified with instructions on how to proceed.
 *
 * @param {Object} next An object defining the next state, provided by Meteor.
 * @param {Function} repl A function specifying a redirection/change, provided by Meteor.
 */
const requireAuth = (next, repl) => {
  if (!isLoggedIn())
    repl({
      pathname: '/',
      state: {nextPathname: next.location.pathname}
    });
  else {
    // onlyIfVerified returns a function, if a user is verified we need not do anything
    // so a constant function returning a noop is returned, if not verified a function that returns a function
    // that performs the path replacement is returned. Then either is executed twice.

    // See onlyIfVerified in only-if-verified.js
    onlyIfVerified(_.constant(_.noop), () => {
      repl({
        pathname: '/unverified',
        state: {nextPathname: '/'}
      });
    })()();
  }
};

/**
 * An onEnter action that specifies that a user should be redirected if they are authenticated.
 *
 * @param {String} to The path to redirect to if user is authenticated
 * @return {Function} The redirecting function that handles redirection to the given path.
 */
const redirectAuth = (to) =>
  (next, repl) => {
    if (Meteor.userId() !== null)
      repl({
        pathname: to,
        state: {nextPathname: next.location.pathname}
      });
  };

Meteor.startup(() => {
  const unverifiedCheck = (next, repl) => {
    if(isLoggedIn())
      onlyIfVerified((next, repl) => {
        repl({pathname: '/home'});
      })(next, repl);
    else
      requireAuth(next, repl);
  };

  const routes = (
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute name="index" component={Index} onEnter={ redirectAuth('/home')}/>
        <Route name="unverified" path="/unverified" component={UnverifiedPage} onEnter={unverifiedCheck} />
        <Route name="homePage" path="/home" component={HomePage} onEnter={ requireAuth }/>
        <Route name="info" path="/info" component={CreateProfile}/>
        <Route name="contact" path="/contact" component={ContactPage}/>
        <Route name="forgot-password" path="/forgot-password" component={ForgotPassword}/>
        <Route name="reset-password" path="/reset-password" component={ResetPassword}/>
        <Route name="profilePage" path="/profile" component={ProfilePage}/>
        <Route name="schedule" path="/schedule" component={Schedule}/>
      </Route>
      <Route path="*" component={NotFound}/>
    </Router>
  );

  // If a user is logged in it is nearly guaranteed Meteor.userId will not be undefined
  // while Meteor.user may as MiniMongo is sync'd, so if a user is logged in we wait to
  // display routes until Meteor.user is available.
  if(isLoggedIn())
    Tracker.autorun((c) => {
      if(_.isNil(Meteor.user()))
        return;

      render(routes, document.getElementById('react-root-container'));
      c.stop();
    });
  else
    render(routes, document.getElementById('react-root-container'));
});
