import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from '../modules/auth/reducers'
import user from '../modules/home/reducers'
import chat from '../modules/chat/reducers'

export default combineReducers({
  form: formReducer,
  auth,
  user,
  chat
})
