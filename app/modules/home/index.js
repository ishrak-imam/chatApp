
import React, {Component} from 'react'
import {
  View, Text, Button
} from 'react-native'

import {signOutReq} from '../auth/reducers'
import { connect } from 'react-redux'

import { getNavInfo } from '../../utils/navigation'
import {pushScene} from '../../navigation/sagas'

class Home extends Component {
  constructor () {
    super()
    this._signOut = this._signOut.bind(this)
    this._goToChat = this._goToChat.bind(this)
  }

  _goToChat () {
    const navInfo = getNavInfo(this.props)
    const scene = { screen: 'Chat', title: 'Chat' }
    this.props.dispatch(pushScene({ scene, navInfo }))
  }

  _signOut () {
    this.props.dispatch(signOutReq())
  }

  render () {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home page</Text>
        <Button title='Sign out' onPress={this._signOut} />
        <Button title='Start chat' onPress={this._goToChat} />
      </View>
    )
  }
}

export default connect(dispatch => ({dispatch}))(Home)
