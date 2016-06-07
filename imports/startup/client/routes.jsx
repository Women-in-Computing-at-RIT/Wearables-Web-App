import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {Meteor} from 'meteor/meteor';

import {App} from '../../ui/layouts/app';
import {Index} from '../../ui/pages/index';

/**
 * An onEnter action that specifies that if a user is not logged in or logging in then they must log in and are
 * redirected to a login page. The page they were going to visit is stored in history.
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
};

const signInRedirect = (next, repl) => {
  if (Meteor.userId() !== null)
    repl({
      pathname: '/home',
      state: {nextPathname: next.location.pathname}
    });
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App } onEnter={ signInRedirect }>
        <IndexRoute name="index" component={Index}/>
      </Route>
    </Router>
    , document.getElementById('react-root-container'));
});
