
import { createAction } from 'redux-act'

import { all, takeLatest } from 'redux-saga/effects'

import { Navigator } from 'react-native-navigation'

const getNavInstance = (params) => {
  return new Navigator(params.navigatorID, params.navigatorEventID, params.screenInstanceID)
}

export const pushScene = createAction('PUSH_SCENE')
export const popScene = createAction('POP_SCENE')
export const resetToScene = createAction('RESET_TO_SCENE')
export const popToRoot = createAction('POP_TO_ROOT')
export const showModal = createAction('SHOW_MODAL')

export function * watchNavActions () {
  yield all([
    takeLatest(pushScene.getType(), workerPushScene),
    takeLatest(popScene.getType(), workerPopScene),
    takeLatest(resetToScene.getType(), workerResetToScene),
    takeLatest(popToRoot.getType(), workerPopToRoot),
    takeLatest(showModal.getType(), workerShowModal)
  ])
};

function * workerPushScene (action) {
  const { scene, navInfo } = action.payload
  const nav = getNavInstance(navInfo)
  nav.push(scene)
}

function * workerPopScene (action) {
  const navInfo = action.payload
  const nav = getNavInstance(navInfo)
  nav.pop()
}

function * workerResetToScene (action) {
  const { scene, navInfo } = action.payload
  const nav = getNavInstance(navInfo)
  nav.resetTo(scene)
}

function * workerPopToRoot (action) {
  const { navInfo } = action.payload
  const nav = getNavInstance(navInfo)
  nav.popToRoot()
}

function * workerShowModal (action) {
  const {scene, navInfo} = action.payload
  const nav = getNavInstance(navInfo)
  nav.showModal(scene)
}
