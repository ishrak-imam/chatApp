
import {createAction, createReducer} from 'redux-act'

const AUTH_INITIAL_STATE = {

}

export const init = createAction('INIT')
export const startApp = createAction('START_APP')

const auth = createReducer({

}, AUTH_INITIAL_STATE)

export default auth
