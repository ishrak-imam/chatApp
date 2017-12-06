
import React, {Component} from 'react'
import {
  Screen, View,
  Tile, Caption
} from '@shoutem/ui'

import SigninForm from '../shared/form/container'
import { SIGNIN_FORM, ERROR_COLOR } from '../shared/form/config'

export default class Signin extends Component {
  constructor () {
    super()
    this._renderError = this._renderError.bind(this)
    this._signIn = this._signIn.bind(this)
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
        </Tile>
      </Screen>
    )
  }
}
