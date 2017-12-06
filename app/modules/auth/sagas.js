
import {call, put, takeLatest} from 'redux-saga/effects'
import {
  startApp,
  singInReq,
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
  setDisplayName,
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
    yield call(register, action.payload)
  } catch (err) {
    yield put(registerFail(err))
  }
}

export function * watchSignOut () {
  yield takeLatest(signOutReq.getType(), workerSignOut)
}

export function * workerSignOut () {
  yield call(signOut)
}

export function * watchAuthStatus () {
  const authWatcher = function (user) {
    if (user) {
      const userObj = {
        email: user.email
      }
      store.dispatch(signInSucs(userObj))
      store.dispatch(startApp(at.home))
    } else {
      store.dispatch(signOutSucs())
      store.dispatch(startApp(at.login))
    }
  }
  onAuthStateChanged(authWatcher)
}
