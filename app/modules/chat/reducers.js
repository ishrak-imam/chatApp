
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

export const messagesGetReq = createAction('MESSAGES_GET_REQ')
export const messagesGetSucs = createAction('MESSAGES_GET_SUCS')
export const messagesGetFail = createAction('MESSAGES_GET_FAIL')

export const sendMessageReq = createAction('SEND_MESSAGE_REQ')
export const sendMessageSucs = createAction('SEND_MESSAGE_SUCS')
export const sendMessageFail = createAction('SEND_MESSAGE_FAIL')

const user = createReducer({

  [messagesGetReq]: (state, payload) => ({ ...state, loading: true, error: null }),
  [messagesGetSucs]: (state, payload) => ({ ...state, loading: false, messages: payload }),
  [messagesGetFail]: (state, payload) => ({ ...state, loading: false, error: payload }),

  [sendMessageReq]: (state, payload) => ({ ...state }),
  [sendMessageSucs]: (state, payload) => ({ ...state }),
  [sendMessageFail]: (state, payload) => ({ ...state }),

  [createThreadSucs]: (state, payload) => ({ ...state, thread: payload })

}, CHAT_INITIAL_STATE)

export default user
