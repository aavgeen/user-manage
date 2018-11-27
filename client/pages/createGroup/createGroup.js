import React, { Component } from 'react';
import { createGroup } from '../../services/restHelper';

export default class CreateGroup extends Component {
  constructor() {
    super();
    this.state = {
      error: '',
      name: '',
      about: ''
      //   isAdmin: ''
    };
  }
  componentDidMount() {}
  onHandleCreate = e => {
    e.preventDefault();
    
    const { name, about } = this.state;
    if (name === '' || about === '') {
      this.setState({ error: 'Please enter the details correctly.' });
      return;
    }
    this.setState({ error: '' });
    const group = {
      name: name || undefined,
      about: about || undefined
    };
    createGroup(group)
      .then(data => {
        if (data.hasOwnProperty('error')) {
          this.setState({ error: data.error });
          return;
        }
        this.setState({ error: 'Group Successfully Created.' });
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
        <div className="z-depth-1 grey lighten-4 cont col s10 m6 l5 marg-top-30">
          {/* method="post" */}
          <div className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <label htmlFor="name">Enter group name</label>
                <input
                  className="validate"
                  type="text"
                  name="name"
                  id="name"
                  onChange={(evt) => { this.setState({name: evt.target.value})}}
                />
              </div>
              
            {/* <div className="row"> */}
              <div className="input-field col s12">
                <label htmlFor="about">About Group</label>
                <input
                  className="validate"
                  type="text"
                  name="about"
                  id="about"
                  onChange={(evt) => { this.setState({about: evt.target.value})}}
                />
              </div>
            {/* </div> */}
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
      </div>
    );
  }
}
