import React from 'react';
import {browserHistory} from 'react-router';
import * as UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

const styles = {
  button: {
    margin: 12,
    color: '#0082ff'
  },
  form: {
    marginTop: '100px',
    margin: '50px auto'
  },
  text: {
    color: '#000'
  }
};

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignUpAction = this.handleSignUpAction.bind(this);
    this.handleRoleSelect = this.handleRoleSelect.bind(this);
    this.state = {
      user: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        role: ''
      }
    }
  }

  componentWillMount() {
    UserStore.addChangeListener(this.handleSignUp, 'signUp');
  }

  handleSignUp() {
    let data = UserStore.getSignUpResult();
    if (data && data.error) {
      window.Materialize.toast(data.error.message, 2000, 'error-toast rounded');
    } else {
      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('userId', data.user._id);
      window.Materialize.toast(data.message, 2000, 'success-toast rounded');
      browserHistory.push('/dashboard');
      if (this.props.closeModal !== undefined) {
        this.props.closeModal();
      }
    }
  }

  handleFieldChange(event) {
    let field = event.target.name;
    let value = event.target.value;
    this.state.user[field] = value;
    this.setState({user: this.state.user});
  }

  handleRoleSelect(event, index, value) {
    this.state.user.role = value;
    this.setState({
      user: this.state.user
    });
  }

  handleSignUpAction(event) {
    event.preventDefault();
    UserActions.signUp(this.state.user);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.handleSignUp, 'signUp');
  }

  render() {
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.handleSignUpAction}>
          <div className="input-field col s12">
            <input className="validate" id="firstname" name="firstname" onChange={this.handleFieldChange} required type="text"/>
            <label htmlFor="firstname">First Name</label>
          </div>
          <div className="input-field col s12">
            <input className="validate" id="lastname" name="lastname" onChange={this.handleFieldChange} required type="text"/>
            <label htmlFor="lastname">Last Name</label>
          </div>
          <div className="input-field col s12">
            <input className="validate" id="username" name="username" onChange={this.handleFieldChange} required type="text"/>
            <label htmlFor="username">Username</label>
          </div>
          <div className="input-field col s12">
            <input className="validate" id="email" name="email" onChange={this.handleFieldChange} required type="email"/>
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s12">
            <input className="validate" id="password" name="password" onChange={this.handleFieldChange} required type="password"/>
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-field col s12">
            <span>Select Role: </span> <br/>
            <SelectField
             value={this.state.user.role}
             onChange={this.handleRoleSelect}
             style={styles.text}>
               <MenuItem value={"admin"} primaryText="Admin"/>
               <MenuItem value={"user"} primaryText="User"/>
               <MenuItem value={"viewer"} primaryText="Viewer"/>
             </SelectField><br/><br/>
          </div>
          <br/>
          <div className="col s12">
            <div className="center">
              <button className="btn waves-effect waves-light blue" name="action" type="submit">
                Sign up
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
