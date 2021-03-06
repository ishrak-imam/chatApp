
import { createAction, createReducer } from 'redux-act'

const USER_INITIAL_STATE = {
  list: [],
  loading: false,
  error: null,
  thread: null,
  currentUser: null
}

// export const userListReq = createAction('USER_LIST_GET_REQ')
// export const userListSucs = createAction('USER_LIST_GET_SUCS')
// export const userListFail = createAction('USER_LIST_GET_FAIL')

export const startUserMonitor = createAction('START_USER_MONITOR')
export const stopUserMonitor = createAction('STOP_USER_MONITOR')
export const incomingUser = createAction('INCOMING_USER')

export const setCurrentUser = createAction('SET_CURRENT_USER')

export const clearUserList = createAction('CLEAR_USER_LIST')

const user = createReducer({

  // [userListReq]: (state, payload) => ({ ...state, loading: true, error: null }),
  // [userListSucs]: (state, payload) => ({ ...state, loading: false, list: payload }),
  // [userListFail]: (state, payload) => ({ ...state, loading: false, error: payload }),

  [incomingUser]: (state, payload) => ({...state, list: [payload, ...state.list]}),

  [setCurrentUser]: (state, payload) => ({...state, currentUser: payload}),

  [clearUserList]: (state, payload) => ({...state, list: []})

}, USER_INITIAL_STATE)

export default user
