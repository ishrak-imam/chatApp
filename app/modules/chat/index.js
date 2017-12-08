
import React, { Component } from 'react'
import {
  View, Text, Button
} from 'react-native'

import { connect } from 'react-redux'
import STYLES from '../../styles/common'

import database from '../../firebase'

import {
  messagesGetReq,
  sendMessageReq
} from './reducers'

class Chat extends Component {
  constructor () {
    super()
    this._sendMessage = this._sendMessage.bind(this)
  }

  componentDidMount () {
    const threadId = this.props.chat.thread
    database.ref('threads/' + threadId + '/messages').on('value', (snapshot) => {
      console.log(snapshot.val())
    })
    this.props.dispatch(messagesGetReq({ threadId }))
  }

  _sendMessage () {
    // // database.ref('threads/' + threadId).set({
    // //   threadId
    // // })

    const threadId = this.props.chat.thread

    const message = {
      from: 1,
      to: 3,
      text: 'hello world'
    }

    this.props.dispatch(sendMessageReq({threadId, message}))

    // const messageId = 222
    // database.ref('threads/' + threadId + '/messages').push({
    //   from: 'a',
    //   to: 'b',
    //   text: 'Hello'
    // })
    // database.ref('threads').once('value').then(threads => {
    //   threads.forEach(item => console.log(item.key))
    // })

    // database.ref('threads/' + threadId + '/messages').once('value').then(data => {
    //   data.forEach(d => console.log(d.val()))
    // })
  }

  render () {
    return (
      <View style={[STYLES.col_center, { flex: 1 }]}>
        <Text>chat</Text>
        <Button title='send message' onPress={this._sendMessage} />
      </View>
    )
  }
}

const stateToProps = ({auth, user, chat}) => ({auth, user, chat})

export default connect(stateToProps, dispatch => ({dispatch}))(Chat)
