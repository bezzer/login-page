import React, {Component} from 'react';
import Button from './components/Button';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions'
import Input from './components/Input';
// Main site entry view
class WelcomeView extends Component {
  doLogout(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(logout());
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loggedIn) {
      hashHistory.replace('/');
    }
  }
  
  render() {
    return <div className="lp-dialog">
      <h1>Welcome {this.props.name}!</h1>
      <div>You are a totally legit user</div>
      <Button onClick={this.doLogout.bind(this)} title="Logout" />
    </div>
  }
}

const mapStateToProps = state => {
  const { loggedIn, name } = state.user;
  return {
    loggedIn, name
  }
};

export default connect(mapStateToProps)(WelcomeView);