
import { put, call, takeLatest } from 'redux-saga/effects'

import {
  userListReq,
  userListSucs,
  userListFail
} from './reducers'

import {getUserList} from '../../firebase'

export function * watchGetUserList () {
  yield takeLatest(userListReq.getType(), workerGetUserList)
}

function _formatUserList (userList) {
  const formatted = []
  userList.forEach(user => {
    formatted.push(user.val())
  })
  return formatted
}

function * workerGetUserList () {
  try {
    const snapShot = yield call(getUserList)
    const userList = _formatUserList(snapShot)
    yield put(userListSucs(userList))
  } catch (err) {
    yield put(userListFail(err))
  }
}
