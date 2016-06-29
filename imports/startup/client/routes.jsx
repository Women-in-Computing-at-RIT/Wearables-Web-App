import React from 'react';

import {Tracker} from 'meteor/tracker';

import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {Meteor} from 'meteor/meteor';

import {Routes} from '../../modules/constants';
import onlyIfVerified from '../../modules/only-if-verified';
import {isLoggedIn} from '../../modules/login';

import {App} from '../../ui/layouts/app';
import {Index} from '../../ui/pages/index';
import {CreateProfile} from '../../ui/pages/information';
import {NotFound} from '../../ui/pages/not-found';
import {ContactPage} from '../../ui/pages/contact';
import {ResetPassword} from '../../ui/pages/reset-password';
import {HomePage} from '../../ui/pages/home';
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
      <Route path={Routes.index} component={ App }>
        <IndexRoute component={Index} onEnter={ redirectAuth('/home')}/>
        <Route path={Routes.unverified} component={UnverifiedPage} onEnter={unverifiedCheck} />
        <Route path={Routes.homepage} component={HomePage} onEnter={ requireAuth }/>
        <Route path={Routes.info} component={CreateProfile}/>
        <Route path={Routes.contact} component={ContactPage}/>
        <Route path={Routes.resetPassword} component={ResetPassword}/>
        <Route path={Routes.schedule} component={Schedule}/>
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
