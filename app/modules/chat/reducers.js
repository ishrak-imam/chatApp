
import { createAction, createReducer } from 'redux-act'

const CHAT_INITIAL_STATE = {
  messages: [],
  loading: false,
  error: null,
  threadId: null,
  buddy: null
}

export const createThreadReq = createAction('CREATE_THREAD_REQ')
export const createThreadSucs = createAction('CREATE_THREAD_SUCS')
export const createThreadFail = createAction('CREATE_THREAD_FAIL')

// export const messagesGetReq = createAction('MESSAGES_GET_REQ')
// export const messagesGetSucs = createAction('MESSAGES_GET_SUCS')
// export const messagesGetFail = createAction('MESSAGES_GET_FAIL')

export const sendMessageReq = createAction('SEND_MESSAGE_REQ')
export const sendMessageSucs = createAction('SEND_MESSAGE_SUCS')
export const sendMessageFail = createAction('SEND_MESSAGE_FAIL')

export const incomingMessage = createAction('INCOMING_MESSAGE')
export const startMessageMonitor = createAction('START_MESSAGE_MONITOR')
export const stopMessageMonitor = createAction('STOP_MESSAGE_MONITOR')

export const clearMessageThread = createAction('CLEAR_MESSAGE_THREAD')

const user = createReducer({

  // [messagesGetReq]: (state, payload) => ({ ...state, loading: true, error: null }),
  // [messagesGetSucs]: (state, payload) => ({ ...state, loading: false, messages: payload }),
  // [messagesGetFail]: (state, payload) => ({ ...state, loading: false, error: payload }),

  [sendMessageReq]: (state, payload) => ({ ...state }),
  [sendMessageSucs]: (state, payload) => ({ ...state }),
  [sendMessageFail]: (state, payload) => ({ ...state }),

  [incomingMessage]: (state, payload) => ({...state, messages: [payload, ...state.messages]}),
  [clearMessageThread]: (state, payload) => ({...state, messages: []}),

  [createThreadSucs]: (state, payload) => ({ ...state, threadId: payload.threadId, buddy: payload.buddy })

}, CHAT_INITIAL_STATE)

export default user
