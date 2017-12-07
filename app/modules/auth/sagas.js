
import {call, put, takeLatest} from 'redux-saga/effects'
import {
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
  onAuthStateChanged,
  signOut
} from '../../firebase'

import RootNavigator from '../../navigation/rootNavigator'

import store from '../../store/configure'

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
    yield put(registerSucs(user))
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
    yield put(signInSucs(user))
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
    yield put(signOutSucs())
  } catch (err) {
    console.log('SIGNOUT ERROR ::: ', err)
  }
}

export function * watchAuthStatus () {
  const authObserver = function (user) {
    user ? store.dispatch(startApp(at.home)) : store.dispatch(startApp(at.login))
  }
  onAuthStateChanged(authObserver)
}
