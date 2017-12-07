
import {createAction, createReducer} from 'redux-act'

const AUTH_INITIAL_STATE = {
  login: false,
  loading: false,
  user: null,
  error: {signIn: null, register: null}
}

export const init = createAction('INIT')
export const startApp = createAction('START_APP')

export const signInReq = createAction('SIGNIN_REQ')
export const signInSucs = createAction('SIGNIN_SUCS')
export const signInFail = createAction('SIGNIN_FAIL')

export const registerReq = createAction('REGISTER_REQ')
export const registerSucs = createAction('REGISTER_SUCS')
export const registerFail = createAction('REGISTER_FAIL')

export const signOutReq = createAction('SIGNOUT_REQ')
export const signOutSucs = createAction('SIGNOUT_SUCS')

const auth = createReducer({

  [signInReq]: (state, payload) => ({...state, loading: true, error: {...state.error, signIn: null}}),
  [signInSucs]: (state, payload) => ({...state, login: true, loading: false, user: payload, error: AUTH_INITIAL_STATE.error}),
  [signInFail]: (state, payload) => ({...state, loading: false, error: {...state.error, signIn: payload}}),

  [registerReq]: (state, payload) => ({...state, loading: true, error: {...state.error, register: null}}),
  [registerSucs]: (state, payload) => ({...state, loading: false, error: AUTH_INITIAL_STATE.error}),
  [registerFail]: (state, payload) => ({...state, loading: false, error: {...state.error, register: payload}}),

  [signOutSucs]: (state, payload) => AUTH_INITIAL_STATE

}, AUTH_INITIAL_STATE)

export default auth
