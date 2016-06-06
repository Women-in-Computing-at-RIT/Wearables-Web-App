import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {Meteor} from 'meteor/meteor';

import {App} from '../../ui/layouts/app';
import {Index} from '../../ui/pages/index';

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
  console.log("test");
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App } onEnter={ signInRedirect }>
        <IndexRoute name="index" component={Index}/>
      </Route>
    </Router>
    , document.getElementById('react-root-container'));
});
