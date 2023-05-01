import { createContext, useEffect, useReducer } from "react"
import Reducer from "./reducer"

const INITIAL_STATE = {
  user: JSON.parse(sessionStorage.getItem('user')) || null,
  isFetching: false,
  error: false
}

export const UserContext = createContext(INITIAL_STATE)

export default function UserContextProvider(props) {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE)

  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(state.user))
  }, [state.user])
  return (
    <UserContext.Provider value={{
      user: state.user,
      isFetching: state.isFetching,
      error: state.error,
      dispatch
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

