
import { fork, all } from 'redux-saga/effects'

import * as navSaga from '../navigation/sagas'
import * as authSaga from '../modules/auth/sagas'

const sagas = {
  ...navSaga,
  ...authSaga
}

const forkedSagas = Object.keys(sagas).map(key => fork(sagas[key]))

export default function * rootSaga () {
  yield all(forkedSagas)
}
