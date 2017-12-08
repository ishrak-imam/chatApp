
import { put, call, takeLatest } from 'redux-saga/effects'

import {
  createThreadReq,
  createThreadSucs,
  createThreadFail
} from './reducers'

import {pushScene} from '../../navigation/sagas'

import { getAllThreads, createThread } from '../../firebase'

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
