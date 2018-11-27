import React, { Component } from 'react';
import M from 'materialize-css';
import { NavLink } from 'react-router-dom';

export default class header extends Component {
  constructor() {
    super();
    this.state = {};
    //   this.showText = this.bind.showText(this);
  }
  componentDidMount() {
    const options = {
      edge: 'left'
    };

    document.addEventListener('DOMContentLoaded', () => {
      const elems = document.querySelectorAll('.sidenav');
      M.Sidenav.init(elems, options);
    });
  }
  render() {
    return (
      <div>
        <div className="hide-on-large-only">
          <nav className="blue darken-2">
            <div className="left-align">
              <ul id="slide-out" className="sidenav">
                <li>
                  <NavLink
                    to="/users"
                    className="waves-effect"
                    activeStyle={{ color: '#E0F2F1' }}
                    exact
                  >
                    <i className="material-icons">person</i>Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/groups"
                    className="waves-effect"
                    activeStyle={{ color: '#E0F2F1' }}
                    exact
                  >
                    <i className="material-icons">group</i>Groups
                  </NavLink>
                </li>
                <li>
                  <div className="divider" />
                </li>
                <li>
                  <NavLink
                    to="/createuser"
                    className="waves-effect"
                    activeStyle={{ color: '#E0F2F1' }}
                    exact
                  >
                    <i className="material-icons">person</i>Create User
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/creategroup"
                    className="waves-effect"
                    activeStyle={{ color: '#E0F2F1' }}
                    exact
                  >
                    <i className="material-icons">group</i>Create Group
                  </NavLink>
                </li>
              </ul>
              <p data-target="slide-out" className="sidenav-trigger">
                <i className="material-icons medium">menu</i>
              </p>
              <span className="brand-logo mag-hor-ten">
                        User Manage
              </span>
            </div>
          </nav>
        </div>
        <div className="hide-on-med-and-down">
          <nav className="blue darken-2">
            <div className="nav-wrapper">
              <span className="brand-logo marg-hor-ten">
                User Management
              </span>
              <ul id="nav-mobile" className="right show-on-medium-and-up">
              <li>
                  <NavLink
                    to="/users"
                    className="waves-effect"
                    activeStyle={{ color: '#E0F2F1' }}
                    exact
                  >
                  <span>Users</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/groups"
                    className="waves-effect"
                    activeStyle={{ color: '#E0F2F1' }}
                    exact
                  >
                  <span>Groups</span>
                  </NavLink>
                </li>
                <li>
                  <div className="divider" />
                </li>
                <li className="">
                  <NavLink
                    to="/createuser"
                    className="waves-effect "
                    activeStyle={{ color: '#E0F2F1' }}
                    exact
                  >
                  <span className="disinline">Create User</span>
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to="/creategroup"
                    className="waves-effect"
                    activeStyle={{ color: '#E0F2F1' }}
                    exact
                  >
                  <span className="disinline">Create Group</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
