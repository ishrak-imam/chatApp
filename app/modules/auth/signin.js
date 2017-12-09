
import React, {Component} from 'react'
import {
  View, Text, TouchableOpacity
} from 'react-native'
import STYLES from '../../styles/common'
import {connect} from 'react-redux'
import SigninForm from '../shared/form/container'
import { SIGNIN_FORM, ERROR_COLOR } from '../shared/form/config'

import { getNavInfo } from '../../utils/navigation'
import { pushScene } from '../../navigation/sagas'

import { signInReq } from './reducers'

class Signin extends Component {
  constructor () {
    super()
    this._renderError = this._renderError.bind(this)
    this._signIn = this._signIn.bind(this)
    this._goToRegister = this._goToRegister.bind(this)
  }

  _renderError () {
    const error = this.props.auth.error.signIn
    return (
      error
        ? (<Text style={{ color: ERROR_COLOR }}>{error.message}</Text>)
        : (null)
    )
  }

  _signIn (obj) {
    this.props.dispatch(signInReq(obj))
  }

  _goToRegister () {
    const navInfo = getNavInfo(this.props)
    const scene = { screen: 'Register', title: 'Register' }
    this.props.dispatch(pushScene({ scene, navInfo }))
  }

  render () {
    return (
      <View style={[{ flex: 1 }, STYLES.col_start, {backgroundColor: 'white', marginTop: 50}]}>
        <View style={{ marginTop: 10 }}>
          {this._renderError()}
        </View>
        <SigninForm onSubmit={this._signIn} config={SIGNIN_FORM} />
        <View style={{marginTop: 30}}>
          <TouchableOpacity onPress={this._goToRegister}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const stateToProps = ({ auth }) => ({ auth })

export default connect(stateToProps, dispatch => ({dispatch}))(Signin)
