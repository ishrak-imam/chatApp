
import { put, call, takeLatest } from 'redux-saga/effects'

import {
  createThreadReq,
  createThreadSucs,
  createThreadFail,
  sendMessageReq,
  sendMessageSucs,
  sendMessageFail,
  messagesGetReq,
  messagesGetSucs,
  messagesGetFail
} from './reducers'

import {formatSnapshot} from '../../utils/helpers'

import {pushScene} from '../../navigation/sagas'

import {
  getAllThreads,
  createThread,
  getAllMessages,
  sendMessage
} from '../../firebase'

function _threadExists (threads, threadId) {
  let bool = false
  threads.forEach(thread => {
    if (thread.key === threadId) {
      bool = true
    }
  })
  return bool
}

export function * watchCreateThread () {
  yield takeLatest(createThreadReq.getType(), workerCreateThread)
}

function * workerCreateThread (action) {
  try {
    const { threadId, scene, navInfo } = action.payload
    const threads = yield call(getAllThreads)
    if (!_threadExists(threads, threadId)) {
      yield call(createThread, { threadId })
    }
    yield put(createThreadSucs(threadId))
    yield put(pushScene({scene, navInfo}))
  } catch (err) {
    yield put(createThreadFail(err))
  }
}

export function * watchGetMessages () {
  yield takeLatest(messagesGetReq.getType(), workerGetMessages)
}

function * workerGetMessages (action) {
  try {
    const { threadId } = action.payload
    const snapShot = yield call(getAllMessages, {threadId})
    const messages = formatSnapshot(snapShot)
    yield put(messagesGetSucs(messages))
  } catch (err) {
    yield put(messagesGetFail(err))
  }
}

export function * watchSendMessage () {
  yield takeLatest(sendMessageReq.getType(), workerSendMessage)
}

function * workerSendMessage (action) {
  try {
    yield call(sendMessage, action.payload)
    yield put(sendMessageSucs())
  } catch (err) {
    yield put(sendMessageFail(err))
  }
}
