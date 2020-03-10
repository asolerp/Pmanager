// store.js
import React, { createContext, useReducer } from 'react'

const initialState = {
  user: undefined,
}
const store = createContext(initialState)
const { Provider } = store

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'set_user':
        return { ...state, user: action.value }
      default:
        throw new Error()
    }
  }, initialState)
  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }
