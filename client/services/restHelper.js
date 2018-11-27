const create = user => fetch('v1/api/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .catch(err => err);

const getUsers = () => fetch('v1/api/users', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
    .then(response => response.json())
    .catch(err => err);

const createGroup = group => fetch('v1/api/group', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(group)
    })
      .then(response => response.json())
      .catch(err => err);
  
  const getGroups = () => fetch('v1/api/group', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(response => response.json())
      .catch(err => err);


export { create, getUsers, createGroup, getGroups };
