
import { put, call, takeLatest, fork, take, takeEvery } from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'
import {
  // userListReq,
  // userListSucs,
  // userListFail,
  startUserMonitor,
  stopUserMonitor,
  incomingUser,
  setCurrentUser,
  clearUserList
} from './reducers'

import {
  // getUserList,
  getUserRef
} from '../../firebase'

import {
  // formatSnapshot,
  // getCurrentUser,
  formatSingleObject
} from '../../utils/helpers'

// export function * watchGetUserList () {
//   yield takeLatest(userListReq.getType(), workerGetUserList)
// }

// function * workerGetUserList (action) {
//   try {
//     const {currentUserId} = action.payload
//     const snapShot = yield call(getUserList)
//     const userList = formatSnapshot(snapShot)
//     yield put(userListSucs(userList))
//     const currentUser = getCurrentUser(userList, currentUserId)
//     yield put(setCurrentUser(currentUser))
//   } catch (err) {
//     yield put(userListFail(err))
//   }
// }

function eventEmitterChannel (emitter, type) {
  return eventChannel((emit) => {
    emitter.on(type, emit)
    return () => emitter.off(type, emit)
  })
}

/**
 * here user list is implemented through eventChannel
 * because it will perform as a listener for new user sign up
 */

export function * watchNewUsers () {
  yield takeLatest(startUserMonitor.getType(), createIncomingUserSubscription)
}

function * createIncomingUserSubscription (action) {
  const userChannel = yield call(eventEmitterChannel, getUserRef(), 'child_added')

  yield fork(function * (channel) {
    yield take(stopUserMonitor.getType())
    channel.close()
    yield put({ type: 'USER_CHANNEL_CLOSED' })
    yield put(clearUserList())
  }, userChannel)

  yield takeEvery(userChannel, function * (user) {
    const {currentUserId} = action.payload
    const payload = formatSingleObject(user)
    yield put(incomingUser(payload))
    if (payload.userId === currentUserId) {
      yield put(setCurrentUser(payload))
    }
  })
}
