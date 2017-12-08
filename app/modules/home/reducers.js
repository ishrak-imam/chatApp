
import { createAction, createReducer } from 'redux-act'

const USER_INITIAL_STATE = {
  list: [],
  loading: false,
  error: null,
  thread: null
}

export const userListReq = createAction('USER_LIST_GET_REQ')
export const userListSucs = createAction('USER_LIST_GET_SUCS')
export const userListFail = createAction('USER_LIST_GET_FAIL')

const user = createReducer({

  [userListReq]: (state, payload) => ({ ...state, loading: true, error: null }),
  [userListSucs]: (state, payload) => ({ ...state, loading: false, list: payload }),
  [userListFail]: (state, payload) => ({ ...state, loading: false, error: payload })

}, USER_INITIAL_STATE)

export default user
