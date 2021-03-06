
import {call, put, takeLatest} from 'redux-saga/effects'
import {
  startApp,
  signInReq,
  signInSucs,
  signInFail,
  registerReq,
  registerSucs,
  registerFail,
  signOutReq,
  signOutSucs,
  signOutFail
} from './reducers'

import {
  register,
  setUserData,
  signIn,
  onAuthStateChanged,
  signOut
} from '../../firebase'

import ChatApp from '../../nav/root'

import store from '../../store/configure'

const at = {
  login: {screen: 'Signin', title: 'Sign in'},
  home: {screen: 'Home', title: 'Home'}
}

export function * watchStartApp () {
  yield takeLatest(startApp.getType(), workerStartApp)
}

function * workerStartApp (action) {
  yield call(ChatApp.start, action.payload)
}

export function * watchRegister () {
  yield takeLatest(registerReq.getType(), workerRegister)
}

function * workerRegister (action) {
  try {
    const response = yield call(register, action.payload)
    const user = {
      username: action.payload.username,
      email: response.email,
      userId: response.uid
    }
    yield call(setUserData, user)
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
      userId: response.uid
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
    yield put(signOutFail())
  }
}

/**
 * TODO:
 * try to implement authStateChanged observer
 * with redux saga event channel.
 *
 * thus store doesn't need to be imported
 * here explicitly
 */
export function * watchAuthStatus () {
  const authObserver = function (user) {
    if (user) {
      store.dispatch(signInSucs({ email: user.email, userId: user.uid }))
      store.dispatch(startApp(at.home))
    } else {
      store.dispatch(startApp(at.login))
    }
  }
  onAuthStateChanged(authObserver)
}
