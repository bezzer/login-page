import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';

// Views
import EntryView from './views/EntryView';
import LoginView from './views/LoginView';
import WelcomeView from './views/WelcomeView';

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

// Main entry point for the app
class MainView extends Component {
  render() {
    return <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/' component={EntryView}/>
        <Route path='/login' component={LoginView}/>
        <Route path='/welcome' component={WelcomeView}/>
      </Router>
    </Provider>;
  }
}

ReactDOM.render(<MainView/>, document.querySelector('#view'));