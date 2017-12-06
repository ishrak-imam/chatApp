
import {call, put, takeLatest} from 'redux-saga/effects'
import {
  init,
  startApp
} from './reducers'

import RootNavigator from '../../navigation/rootNavigator'

const at = {
  login: {screen: 'Signin', title: 'Sign in'},
  home: {screen: 'Home', title: 'Home'}
}

function checkLogin () {
  return new Promise((resolve, reject) => {
    const login = false
    login ? resolve('login') : reject('not login')
  })
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
  try {
    const login = yield call(checkLogin)
    console.log(login)
    yield put(startApp(at.home))
  } catch (e) {
    console.log(e)
    yield put(startApp(at.login))
  }
}
