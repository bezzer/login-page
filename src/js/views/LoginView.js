import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { login, invalidLogin } from '../actions';
import Button from './components/Button';
import Input from './components/Input';
// Main site entry view

const MIN_LENGTH = 4;

class LoginView extends Component {
  constructor () {
    super();

    this.state = {
      username: "",
      password: ""
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.loggedIn) {
      hashHistory.push('/welcome');
    }
  }
  
  doLogin(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const { dispatch } = this.props;
    
    // Password must contain a non alphabetic character
    let nonAlpha = /[^a-zA-Z]/
    
    // Pre-validate the fields
    if (username.length >= MIN_LENGTH && 
        password.length >= MIN_LENGTH &&
        nonAlpha.test(password)) {
      dispatch(login(username, password));
    } else {
      dispatch(invalidLogin());
    }
  }

  onInput(field, e) {
    e.preventDefault();
    var newState = this.state;
    newState[field] = e.target.value;
    this.setState(newState);
  }
  
  render() {
    const { loginRequested, loginIncorrect } = this.props;
    return <div className="lp-dialog">
      <h1>Login</h1>
      {loginIncorrect ? <div className="lp-error">The username or password is incorrect</div> : null}
      <Input onChange={this.onInput.bind(this, 'username')} placeholder="Username" value={this.state.username}/>
      <Input onChange={this.onInput.bind(this, 'password')} type="password" placeholder="Password" value={this.state.password}/>
      <Button onClick={this.doLogin.bind(this)} title="Login" loading={loginRequested}/>
    </div>
  }
}

const mapStateToProps = state => {
  const { loggedIn, loginRequested, loginIncorrect } = state.user;
  return {
    loggedIn, loginRequested, loginIncorrect
  }
};

export default connect(mapStateToProps)(LoginView);