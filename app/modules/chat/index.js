
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GiftedChat } from 'react-native-gifted-chat'

import {
  // messagesGetReq,
  startMessageMonitor,
  sendMessageReq,
  stopMessageMonitor
} from './reducers'

class Chat extends Component {
  constructor () {
    super()
    this._sendMessage = this._sendMessage.bind(this)
  }

  componentWillMount () {
    const {username} = this.props.chat.buddy
    this.props.navigator.setTitle({ title: `Chat with: ${username}` })
  }

  componentWillUnmount () {
    this.props.dispatch(stopMessageMonitor())
  }

  componentDidMount () {
    const {threadId} = this.props.chat
    // this.props.dispatch(messagesGetReq({ threadId }))
    this.props.dispatch(startMessageMonitor({threadId}))
  }

  _sendMessage (payload) {
    const {threadId, buddy} = this.props.chat
    const {userId, username} = this.props.user.currentUser
    const message = {
      from: userId,
      to: buddy.userId,
      text: payload[0].text,
      user: {
        name: username,
        _id: userId
      }
    }
    this.props.dispatch(sendMessageReq({threadId, message}))
  }

  render () {
    const {userId} = this.props.user.currentUser
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

const stateToProps = ({user, chat}) => ({user, chat})

export default connect(stateToProps, dispatch => ({dispatch}))(Chat)
