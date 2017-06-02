
//fetch does not send cookies, need to pass credential if need it
export const logout = () => {
  return (dispatch) => {
    fetch('/api/auth/sign_out', {
      method: 'DELETE',
      credentials: 'include'
    }).then( () => dispatch(currentUser()))

  }
}

export const authenticate = (email, password, title, history) => {
  return (dispatch) => {
    let endpoint = title === 'Register' ? 'signup' : 'signin';
    fetch(`/api/auth/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ email, password })
   }).then( res => res.json() )
     .then( user => {
       dispatch(currentUser(user))
       history.replace('/dashboard')
     })
  }
}

export const tryFetchUser = (cb) => {
  return (dispatch) => {
    fetch('/api/auth/user', {
      method: 'GET',
      credentials: 'include'
    }).then( res => res.json() )
      .then( user => dispatch(currentUser(user)) )
      .then( () => cb() )
  }
}

const currentUser = (user = {}) => {
  return {type: 'USER', user}
}
