
import React, {Component} from 'react'
import {
  Screen, View, TouchableOpacity,
  Tile, Caption, Text
} from '@shoutem/ui'
import {connect} from 'react-redux'
import SigninForm from '../shared/form/container'
import { SIGNIN_FORM, ERROR_COLOR } from '../shared/form/config'

import { getNavInfo } from '../../utils/navigation'
import {pushScene} from '../../navigation/sagas'

class Signin extends Component {
  constructor () {
    super()
    this._renderError = this._renderError.bind(this)
    this._signIn = this._signIn.bind(this)
    this._goToRegister = this._goToRegister.bind(this)
  }

  _renderError () {
    return (
      this.props.error
        ? (<Caption style={{ color: ERROR_COLOR }}>{this.props.error.message}</Caption>)
        : (null)
    )
  }

  _signIn (obj) {
    console.log(obj)
  }

  _goToRegister () {
    const navInfo = getNavInfo(this.props)
    const scene = { screen: 'Register', title: 'Register' }
    this.props.dispatch(pushScene({ scene, navInfo }))
  }

  render () {
    return (
      <Screen>
        <Tile styleName='text-centric'>
          <View style={{ marginTop: 10 }}>
            {this._renderError()}
          </View>
          <View>
            <SigninForm onSubmit={this._signIn} config={SIGNIN_FORM} />
          </View>
          <View styleName='vertical h-center' style={{marginTop: 20}}>
            <TouchableOpacity onPress={this._goToRegister}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>REGISTER</Text>
            </TouchableOpacity>
          </View>
        </Tile>
      </Screen>
    )
  }
}

export default connect(dispatch => ({dispatch}))(Signin)
