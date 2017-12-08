
import React, { Component } from 'react'
import {
  View, Text
} from 'react-native'

import { connect } from 'react-redux'

import STYLES from '../../styles/common'

class Chat extends Component {
  render () {
    return (
      <View style={[STYLES.col_center, { flex: 1 }]}>
        <Text>chat</Text>
      </View>
    )
  }
}

export default connect(dispatch => ({dispatch}))(Chat)
