
import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'
import RegisterForm from '../shared/form/container'
import { REGISTER_FORM, ERROR_COLOR } from '../shared/form/config'

import STYLES from '../../styles/common'

import {registerReq} from './reducers'

class Register extends Component {
  constructor () {
    super()
    this._renderError = this._renderError.bind(this)
    this._register = this._register.bind(this)
  }

  _renderError () {
    const error = this.props.auth.error.register
    return (
      error
        ? (<Text style={{ color: ERROR_COLOR }}>{error.message}</Text>)
        : (null)
    )
  }

  _register (obj) {
    this.props.dispatch(registerReq(obj))
  }

  render () {
    return (
      <View style={[{ flex: 1 }, STYLES.col_start, { backgroundColor: 'white', marginTop: 50 }]}>
        <View style={{marginTop: 10}}>
          {this._renderError()}
        </View>
        <RegisterForm onSubmit={this._register} config={REGISTER_FORM} />
      </View>
    )
  }
}

const stateToProps = ({auth}) => ({auth})

export default connect(stateToProps, dispatch => ({dispatch}))(Register)
