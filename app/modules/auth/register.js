
import React, {Component} from 'react'
import {
  Screen, View,
  Tile, Caption
} from '@shoutem/ui'
import {connect} from 'react-redux'
import RegisterForm from '../shared/form/container'
import { REGISTER_FORM, ERROR_COLOR } from '../shared/form/config'

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
        ? (<Caption style={{ color: ERROR_COLOR }}>{error.message}</Caption>)
        : (null)
    )
  }

  _register (obj) {
    this.props.dispatch(registerReq(obj))
  }

  render () {
    return (
      <Screen>
        <Tile styleName='text-centric'>
          <View style={{ marginTop: 10 }}>
            {this._renderError()}
          </View>
          <View>
            <RegisterForm onSubmit={this._register} config={REGISTER_FORM} />
          </View>
        </Tile>
      </Screen>
    )
  }
}

const stateToProps = ({auth}) => ({auth})

export default connect(stateToProps, dispatch => ({dispatch}))(Register)
