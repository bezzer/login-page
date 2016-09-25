import React, {Component} from 'react';
import { Link } from 'react-router';
import Input from './components/Input';
// Main site entry view
export default class EntryView extends Component {
  render() {
    return <div className="lp-dialog">
      <h1>Enter</h1>
      <div>Welcome to the sample site login.</div>
      <Link className="lp-btn" to="/login">Login</Link>
    </div>
  }
}