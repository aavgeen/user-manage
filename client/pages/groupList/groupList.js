import React, { Component } from 'react';
import { getGroups } from '../../services/restHelper';

export default class GroupList extends Component {
  constructor() {
    super();
    this.state = {
      error: '',
      groups: [],
      filteredGroups: []
    };
  }
  componentWillMount() {
    getGroups()
      .then(data => {
        console.log(data);
        if (data.error) {
          this.setState({ error: data.error });
        }
        this.setState({ error: '' });
        this.setState({ groups: data });
        this.setState({filteredGroups: data})
      })
      .catch(err => {
        console.log(err);
      });
  }
  filterList = (event) => {
    event.preventDefault();
    let { groups } = this.state;

    groups = groups.filter((item) => {
      const uu = item.name.toLowerCase() + item.about.toLowerCase();
      return uu.indexOf(event.target.value.toLowerCase()) !== -1;
    });
    this.setState({filteredGroups: groups});
  }
  render() {
    const { filteredGroups, error } = this.state;
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
              <th>About</th>
              <th>Details</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredGroups.map((user, i) => 
              [
                <tr>
                  <td key={user.name}>{user.name}</td>
                  <td key={user.about}>{user.about}</td>
                  <td key={`${user.name  }i`}>
                    <span className="btn-floating disabled">
                      <i className="material-icons blue darken-4">details</i>
                    </span>
                  </td>
                  <td key={`${user.about  }i`}>
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
