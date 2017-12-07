
import {call, put, takeLatest} from 'redux-saga/effects'
import {
  init,
  startApp,
  signInReq,
  signInSucs,
  signInFail,
  registerReq,
  registerSucs,
  registerFail,
  signOutSucs,
  signOutReq
} from './reducers'

import {
  register,
  signIn,
  signOut
} from '../../firebase'

import RootNavigator from '../../navigation/rootNavigator'

import {setData, getData, removeData} from '../../storage'

const at = {
  login: {screen: 'Signin', title: 'Sign in'},
  home: {screen: 'Home', title: 'Home'}
}

export function * watchStartApp () {
  yield takeLatest(startApp.getType(), workerStartApp)
}

function * workerStartApp (action) {
  yield call(RootNavigator.startApp, action.payload)
}

export function * watchInit () {
  yield takeLatest(init.getType(), workerInit)
}

function * workerInit () {
  const user = yield call(getData)
  if (user) {
    yield put(signInSucs(user))
    yield put(startApp(at.home))
  } else {
    yield put(startApp(at.login))
  }
}

export function * watchRegister () {
  yield takeLatest(registerReq.getType(), workerRegister)
}

function * workerRegister (action) {
  try {
    const response = yield call(register, action.payload)
    const user = {
      email: response.email,
      uid: response.uid
    }
    yield call(setData, user)
    yield put(registerSucs())
    yield put(init())
  } catch (err) {
    yield put(registerFail(err))
  }
}

export function * watchSignIn () {
  yield takeLatest(signInReq.getType(), workerSignIn)
}

function * workerSignIn (action) {
  try {
    const response = yield call(signIn, action.payload)
    const user = {
      email: response.email,
      uid: response.uid
    }
    yield call(setData, user)
    yield put(init())
  } catch (err) {
    yield put(signInFail(err))
  }
}

export function * watchSignOut () {
  yield takeLatest(signOutReq.getType(), workerSignOut)
}

function * workerSignOut () {
  try {
    yield call(signOut)
    yield call(removeData)
    yield put(signOutSucs())
    yield put(init())
  } catch (err) {
    console.log('SIGNOUT ERROR ::: ', err)
  }
}
