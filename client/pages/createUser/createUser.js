import React, { Component } from 'react';
import { create } from '../../services/restHelper';

export default class Create extends Component {
  constructor() {
    super();
    this.state = {
      error: '',
      name: '',
      email: '',
      password: '',
      citizenOf: '',
      about: ''
      //   isAdmin: ''
    };
  }
  componentDidMount() {}
  onHandleCreate = e => {
    e.preventDefault();
    
    const { name, email, password, citizenOf, about } = this.state;
    if (this.validateEmail(email) === false) {
      this.setState({ error: 'Please enter the correct Email.' });
      return;
    }
    if (password === '') {
      this.setState({ error: 'Please enter the password.' });
      return;
    }
    if (name === '' || email === '' || citizenOf === '' || about === '') {
      this.setState({ error: 'Please enter the details correctly.' });
      return;
    }
    this.setState({ error: '' });
    const user = {
      name: name || undefined,
      email: email || undefined,
      password: password || undefined,
      citizen_of: citizenOf || undefined,
      about: about || undefined
    };
    create(user)
      .then(data => {
        if (data.hasOwnProperty('error')) {
          this.setState({ error: data.error });
          return;
        }
        this.setState({ error: 'User Successfully Created.' });
      })
      .catch(err => {
        console.log(err);
      });
  };
  validateEmail = email => {
    const re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
    return re.test(email);
  };
  render() {
    const { error } = this.state;
    return (
      <div className="container center-align">
        <div className="z-depth-1 grey lighten-4 cont col s10 m8 l7 marg-top-30">
          {/* method="post" */}
          <div className="col s12">
            <div className="row">
              <div className="input-field col s12 m6">
                <label htmlFor="name">Enter user name</label>
                <input
                  className="validate"
                  type="text"
                  name="name"
                  id="name"
                  onChange={(evt) => { this.setState({name: evt.target.value})}}
                />
              </div>
              <div className="input-field col s12 m6">
                <label htmlFor="email">Enter user email</label>
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
              <div className="input-field col s12 m6">
                <input
                  className="validate"
                  type="password"
                  name="password"
                  id="password"
                  onChange={(evt) => { this.setState({password: evt.target.value})}}
                />
                <label htmlFor="password">Enter user password</label>
              </div>
              <div className="input-field col s12 m6">
                <label htmlFor="citi">Enter user Citizenship</label>
                <input
                  className="validate"
                  type="text"
                  name="citi"
                  id="citi"
                  onChange={(evt) => { this.setState({citizenOf: evt.target.value})}}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label htmlFor="about">About user</label>
                <input
                  className="validate"
                  type="text"
                  name="about"
                  id="about"
                  onChange={(evt) => { this.setState({about: evt.target.value})}}
                />
              </div>
            </div>
            {/* <div className="row">
              <div className="input-field col s12">
                <label>
                  <input
                    type="checkbox"
                    ref={c => {
                      this.is_admin = c;
                    }}
                  />
                  <span>Is Admin?</span>
                </label>
              </div>
            </div> */}
            <br />
            <p className="red-text text-darken-3">{error}</p>
            <center>
              <div className="row">
                <button
                  className="btn btn-large waves-effect waves-light blue darken-4"
                  type="submit"
                  name="action"
                  onClick={this.onHandleCreate}
                >
                  Create
                </button>
              </div>
            </center>
          </div>
        </div>
      </div>
    );
  }
}
