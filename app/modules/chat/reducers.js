
import { createAction, createReducer } from 'redux-act'

const CHAT_INITIAL_STATE = {
  messages: [],
  loading: false,
  error: null,
  thread: null
}

export const createThreadReq = createAction('CREATE_THREAD_REQ')
export const createThreadSucs = createAction('CREATE_THREAD_SUCS')
export const createThreadFail = createAction('CREATE_THREAD_FAIL')

const user = createReducer({

  [createThreadSucs]: (state, payload) => ({ ...state, thread: payload })

}, CHAT_INITIAL_STATE)

export default user
