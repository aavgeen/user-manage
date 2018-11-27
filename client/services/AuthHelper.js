const signin = user =>
  fetch('v1/auth/signin/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .catch(err => console.log(err));

export default signin;
