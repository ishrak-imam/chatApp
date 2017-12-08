
import { fork, all } from 'redux-saga/effects'

import * as navSaga from '../navigation/sagas'
import * as authSaga from '../modules/auth/sagas'
import * as userSaga from '../modules/home/sagas'

const sagas = {
  ...navSaga,
  ...authSaga,
  ...userSaga
}

const forkedSagas = Object.keys(sagas).map(key => fork(sagas[key]))

export default function * rootSaga () {
  yield all(forkedSagas)
}
