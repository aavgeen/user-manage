import React, { Component } from 'react';
import signin  from '../../services/AuthHelper';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: '',
      password: '',
      email: '',
      loggedIn: false,
    };
  }
  componentDidMount() {
    document.addEventListener('DOMContentLoaded', () => { 
      const tk = sessionStorage.getItem('logintoken');
      console.log(tk);
      if(tk !== '') {
        this.setState({loggedIn: true});
      }
    }, false);
  }
  docReady = () => {

  }
  handleLoginClick = (e) => {
    e.preventDefault();
    const {email, password, loggedIn} = this.state;
    console.log(this.validateEmail(email));
    if (this.validateEmail(email) === false) {
      this.setState({ error: "Please enter the correct Email." });
      return;
    }
    if (email === '' || password === '') {
      this.setState({ error: "Please enter the credentials correctly." });
      return;
    }
    this.setState({ error: "" });
    const user = {
      email: email || undefined,
      password: password || undefined,
    };
    signin(user).then(data => {
      if (data.hasOwnProperty('error')) {
        this.setState({ error: data.error });
        return;
      }
      sessionStorage.setItem('logintoken', data.token);
      
      this.setState({
        loggedin: true,
      })
    })
    .catch(err => {
      console.log(err);
    });
  };
  validateEmail = (email) =>{
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  render() {
    const { error, loggedin } = this.state;
    return (
      <div className="container">
        { !loggedin ? 
        (<div className="row flex-col marg-top-30">
          <div className="row">
            <h5 className="blue-text text-darken-4">
              Please, login into your account
            </h5>
          </div>
          <div className="col s12 m8 l4 card-panel backpanel center-align  cont">
            <div className="row">
              <div className="row">
                <div className="input-field col s12">
                  <label htmlFor="email">Enter your email</label>
                  <input
                    className="validate"
                    type="email"
                    name="email"
                    id="email"
                    onChange={(evt) => { this.setState({email: evt.target.value})}}
                  />
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input
                    className="validate"
                    type="password"
                    name="password"
                    id="password"
                    onChange={(evt) => { this.setState({password: evt.target.value})}}
                  />
                  <label htmlFor="password">Enter your password</label>
                </div>
              </div>
              <p className="red-text text-darken-3">{error}</p>
              <center>
                <div className="row">
                  <button
                    className="btn btn-medium waves-effect waves-light blue darken-4"
                    type="submit"
                    name="action"
                    onClick={this.handleLoginClick}
                  >
                    Login
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </center>
            </div>
          </div>
        </div>)
        :
        (<div className="marg-top-30 blue-text text-darken-4 center-align"><h4>Welcome. Please Choose a option from the header</h4></div>)}
      </div>
    );
  }
}
