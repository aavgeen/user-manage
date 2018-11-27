import React, { Component } from 'react';
import { getUsers } from '../../services/restHelper';

export default class UserList extends Component {
  constructor() {
    super();
    this.state = {
      error: '',
      users: [],
      filteredUsers: []
    };
  }
  componentWillMount() {
    getUsers()
      .then(data => {
        if (data.error) {
          this.setState({ error: data.error });
        }
        this.setState({ error: '' });
        this.setState({ users: data });
        this.setState({filteredUsers: data})
      })
      .catch(err => {
        console.log(err);
      });
  }
  filterList = (event) => {
    event.preventDefault();
    let { users } = this.state;

    users = users.filter((item) => {
      const uu = item.name.toLowerCase() + item.email.toLowerCase() + item.citizen_of.toLowerCase();
      return uu.indexOf(event.target.value.toLowerCase()) !== -1;
    });
    this.setState({filteredUsers: users});
  }
  render() {
    const { filteredUsers, error } = this.state;
    return (
      <div className="container backpanel center-align card-panel marg-top-30">
      
        <div className="z-depth-1 input-field col s10 m8 l7 marg-top-30">
          <i className="material-icons prefix">search</i>
          <input
            type="text"
            className="form-control center-align blue-text text-darken-4"
            placeholder="Search"
            onChange={this.filterList}
          />
        </div>
        {/* <ul className="pagination">
          <li className="disabled">
            <a href="#!">
              <i className="material-icons">chevron_left</i>
            </a>
          </li>
          <li className="active">
            <a href="#!">1</a>
          </li>
          <li className="waves-effect">
            <a href="#!">2</a>
          </li>
          <li className="waves-effect">
            <a href="#!">3</a>
          </li>
          <li className="waves-effect">
            <a href="#!">4</a>
          </li>
          <li className="waves-effect">
            <a href="#!">5</a>
          </li>
          <li className="waves-effect">
            <a href="#!">
              <i className="material-icons">chevron_right</i>
            </a>
          </li>
        </ul> */}
        <table className="highlight responsive-table pad-hor-ten sortable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Citizen of</th>
              <th>Groups</th>
              <th>Details</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, i) => 
              [
                <tr>
                  <td key={user.name}>{user.name}</td>
                  <td key={user.email}>{user.email}</td>
                  <td key={user.citizen_of}>{user.citizen_of}</td>
                  <td key={user.group_ids}>{user.group_ids}</td>
                  <td key={`${user.citizen_of  }i`}>
                    <span className="btn-floating disabled">
                      <i className="material-icons blue darken-4">details</i>
                    </span>
                  </td>
                  <td key={`${user.email  }i`}>
                    <span className="btn-floating disabled">
                      <i className="material-icons blue darken-4">edit</i>
                    </span>
                  </td>
                </tr>
              ]
            )}
          </tbody>
        </table>
        <h4 className="red-text text-darken-3">{error}</h4>
      </div>
    );
  }
}
