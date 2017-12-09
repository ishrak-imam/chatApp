
import { put, call, takeLatest } from 'redux-saga/effects'

import {
  userListReq,
  userListSucs,
  userListFail,
  setCurrentUser
} from './reducers'

import { getUserList } from '../../firebase'

import {formatSnapshot, getCurrentUser} from '../../utils/helpers'

export function * watchGetUserList () {
  yield takeLatest(userListReq.getType(), workerGetUserList)
}

function * workerGetUserList (action) {
  try {
    const {currentUserId} = action.payload
    const snapShot = yield call(getUserList)
    const userList = formatSnapshot(snapShot)
    yield put(userListSucs(userList))
    const currentUser = getCurrentUser(userList, currentUserId)
    yield put(setCurrentUser(currentUser))
  } catch (err) {
    yield put(userListFail(err))
  }
}
