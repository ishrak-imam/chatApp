
import React, { Component } from 'react'
import {
  View, Text, Button
} from 'react-native'

import { connect } from 'react-redux'
import STYLES from '../../styles/common'

// import database from '../../firebase'

import { GiftedChat } from 'react-native-gifted-chat'

import {
  messagesGetReq,
  sendMessageReq,
  stopMessageMonitor
} from './reducers'

class Chat extends Component {
  constructor () {
    super()
    // this.state = {
    //   messages: [
    //     {
    //       _id: 1,
    //       text: 'Hello developer',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://facebook.github.io/react/img/logo_og.png'
    //       }
    //     }
    //   ]
    // }
    this._sendMessage = this._sendMessage.bind(this)
  }

  componentWillUnmount () {
    this.props.dispatch(stopMessageMonitor())
  }

  componentDidMount () {
    const {threadId} = this.props.chat
    // database.ref('threads/' + threadId + '/messages').on('value', (snapshot) => {
    //   console.log(snapshot.val())
    // })
    this.props.dispatch(messagesGetReq({ threadId }))
    // this.props.dispatch(startMessageMonitor({threadId}))
  }

  _sendMessage (payload) {
    const {threadId, buddy} = this.props.chat
    const {userId, username} = this.props.auth.user
    const message = {
      from: userId,
      to: buddy.userId,
      text: payload[0].text,
      user: {
        // name: username,
        _id: userId
      }
    }
    this.props.dispatch(sendMessageReq({threadId, message}))
  }

  render () {
    const {userId} = this.props.auth.user
    const {messages} = this.props.chat
    return (
      <GiftedChat
        messages={messages}
        onSend={message => this._sendMessage(message)}
        user={{_id: userId}}
      />
    )
  }
}

const stateToProps = ({auth, user, chat}) => ({auth, user, chat})

export default connect(stateToProps, dispatch => ({dispatch}))(Chat)
