import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';

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

/**
 * An onEnter action that requires the user accessing that route to be authenticated. If the user is not authenticated
 * they are redirected to a login page.
 *
 * @param {Object} next An object defining the next state, provided by Meteor.
 * @param {Function} repl A function specifying a redirection/change, provided by Meteor.
 */
const requireAuth = (next, repl) => {
  if (!Meteor.loggingIn() && !Meteor.userId())
    repl({
      pathname: '/login',
      state: {nextPathname: next.location.pathname}
    });

  if(!Meteor.user().emails[0].verified) {
    Session.set('needsVerification', true);
    repl({
      pathname: '/'
    });
  }
};

/**
 * An onEnter action that specifies that a user should be redirected if they are authenticated.
 *
 * @param {String} to The path to redirect to if user is authenticated
 * @return {Function} The redirecting function that handles redirection to the given path.
 */
const redirectAuth = (to) => (next, repl) => {
  if (Meteor.userId() !== null)
    repl({
      pathname: to,
      state: {nextPathname: next.location.pathname}
    });
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute name="index" component={Index} onEnter={ redirectAuth('/home')}/>
        <Route name="homePage" path="/home" component={HomePage}/>
        <Route name="info" path="/info" component={CreateProfile}/>
        <Route name="contact" path="/contact" component={ContactPage}/>
        <Route name="forgot-password" path="/forgot-password" component={ForgotPassword}/>
        <Route name="reset-password" path="/reset-password" component={ResetPassword}/>
        <Route name="profilePage" path="/profile" component={ProfilePage}/>
        <Route name="schedule" path="/schedule" component={Schedule}/>
      </Route>
      <Route path="*" component={NotFound}/>
    </Router>
    , document.getElementById('react-root-container'));
});
