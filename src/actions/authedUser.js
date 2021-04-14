export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser (id) {
  return {
    type: SET_AUTHED_USER,
    id,
  }
}

export function handleSetAuthedUser (AUTHED_ID) {
  console.log(AUTHED_ID)
  return (dispatch) => {
    dispatch(setAuthedUser(AUTHED_ID))
  }
}
