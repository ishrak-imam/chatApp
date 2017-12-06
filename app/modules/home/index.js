
import React, {Component} from 'react'
import {
  View, Text, Button
} from 'react-native'

import {signOutReq} from '../auth/reducers'
import {connect} from 'react-redux'

class Home extends Component {
  constructor () {
    super()
    this._signOut = this._signOut.bind(this)
  }

  _signOut () {
    this.props.dispatch(signOutReq())
  }

  render () {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home page</Text>
        <Button title='Sign out' onPress={this._signOut} />
      </View>
    )
  }
}

export default connect(dispatch => ({dispatch}))(Home)
