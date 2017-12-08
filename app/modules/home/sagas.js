
import { put, call, takeLatest } from 'redux-saga/effects'

import {
  userListReq,
  userListSucs,
  userListFail
} from './reducers'

import { getUserList } from '../../firebase'

import {formatSnapshot} from '../../utils/helpers'

export function * watchGetUserList () {
  yield takeLatest(userListReq.getType(), workerGetUserList)
}

function * workerGetUserList () {
  try {
    const snapShot = yield call(getUserList)
    const userList = formatSnapshot(snapShot)
    yield put(userListSucs(userList))
  } catch (err) {
    yield put(userListFail(err))
  }
}
