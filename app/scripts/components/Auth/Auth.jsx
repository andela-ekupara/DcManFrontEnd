import React from 'react';
import {browserHistory} from 'react-router';
import * as UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import FlatButton from 'material-ui/lib/flat-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SignUpForm from './SignUp.jsx';
import SignInForm from './SignIn.jsx';

// Needed for onTouchTap
injectTapEventPlugin();

const style = {
  tab: {
    backgroundColor: 'rgba(103, 96, 96, 0.24)'
  },
  auth: {
    width: '100%',
    textAlign: 'center'
  }
};

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.getSession = this.getSession.bind(this);
  }

  componentWillMount() {
    UserActions.session();
    UserStore.addChangeListener(this.getSession, 'session');
  }

  getSession() {
    let data = UserStore.getSession();
    if (data && data.error) {
      browserHistory.push('/');
    } else {
      browserHistory.push('/dashboard');
    }
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.getSession, 'session');
  }

  render() {
    return (
      <div className='container' style={style.auth}>
        <Tabs
          tabItemContainerStyle={style.tab}
          inkBarStyle={{backgroundColor: "#0082ff"}}>
          <Tab label="Sign In"
            style={{color: "#0082ff"}} >
            <SignInForm closeModal={this.props.closeModal}/>
          </Tab>
          <Tab label="Sign Up"
            style={{color: "#0082ff"}} >
            <SignUpForm closeModal={this.props.closeModal}/>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default Auth;
