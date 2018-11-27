import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/login/login';
import Header from './components/header/header';
import UserList from './pages/userList/userList';
import GroupList from './pages/groupList/groupList';
import CreateUser from './pages/createUser/createUser';
import CreateGroup from './pages/createGroup/createGroup';

export default function MainRouter() {
  return (
    <div>
        <Header />
        <Switch>
            <Route path="/" exact strict component={Login} />
            <Route path="/home" exact strict component={Login} />
            <Route path="/users" exact strict component={UserList} />
            <Route path="/groups" exact strict component={GroupList} />
            <Route path="/createuser" exact strict component={CreateUser} />
            <Route path="/creategroup" exact strict component={CreateGroup} />
        </Switch>
    </div>
  )
}
