
import { put, call, takeLatest, fork, take, takeEvery } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import {
  createThreadReq,
  createThreadSucs,
  createThreadFail,
  sendMessageReq,
  sendMessageSucs,
  sendMessageFail,
  // messagesGetReq,
  // messagesGetSucs,
  // messagesGetFail,
  incomingMessage,
  startMessageMonitor,
  stopMessageMonitor,
  clearMessageThread
} from './reducers'

import {
  threadExists,
  formatSingleObject
} from '../../utils/helpers'

import {pushScene} from '../../navigation/sagas'

import {
  getAllThreads,
  createThread,
  // getAllMessages,
  sendMessage,
  getThreadRef
} from '../../firebase'

export function * watchCreateThread () {
  yield takeLatest(createThreadReq.getType(), workerCreateThread)
}

function * workerCreateThread (action) {
  try {
    const { threadId, buddy, scene, navInfo } = action.payload
    const threads = yield call(getAllThreads)
    if (!threadExists(threads, threadId)) {
      yield call(createThread, { threadId })
    }
    yield put(createThreadSucs({threadId, buddy}))
    yield put(pushScene({scene, navInfo}))
  } catch (err) {
    yield put(createThreadFail(err))
  }
}

// export function * watchGetMessages () {
//   yield takeLatest(messagesGetReq.getType(), workerGetMessages)
// }

// function * workerGetMessages (action) {
//   try {
//     const { threadId } = action.payload
//     const snapShot = yield call(getAllMessages, {threadId})
//     const messages = formatSnapshot(snapShot)
//     yield put(messagesGetSucs(messages))
//     yield put(startMessageMonitor({threadId}))
//   } catch (err) {
//     yield put(messagesGetFail(err))
//   }
// }

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

function eventEmitterChannel (emitter, type) {
  return eventChannel((emit) => {
    emitter.on(type, emit)
    return () => emitter.off(type, emit)
  })
}

export function * watchNewMessages () {
  yield takeLatest(startMessageMonitor.getType(), createIncomingMessagesSubscription)
}

function * createIncomingMessagesSubscription (action) {
  const {threadId} = action.payload
  const messagesChannel = yield call(eventEmitterChannel, getThreadRef({threadId}), 'child_added')

  yield fork(function * (channel) {
    yield take(stopMessageMonitor.getType())
    channel.close()
    yield put({ type: 'MESSAGES_CHANNEL_CLOSED' })
    yield put(clearMessageThread())
  }, messagesChannel)

  yield takeEvery(messagesChannel, function * (message) {
    console.log(action)
    const payload = formatSingleObject(message)
    yield put(incomingMessage(payload))
  })
}
