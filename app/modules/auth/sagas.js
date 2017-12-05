
import {call, put, takeLatest} from 'redux-saga/effects'
import {
  init,
  startApp
} from './reducers'

import RootNavigator from '../../navigation/rootNavigator'

const at = {
  login: {screen: 'Login', title: 'Login'},
  home: {screen: 'Home', title: 'Home'}
}

const login = true

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
  login ? yield put(startApp(at.home)) : yield put(startApp(at.login))
}
