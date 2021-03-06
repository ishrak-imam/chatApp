
import React, {Component} from 'react'
import {
  View, Text, TouchableOpacity,
  ScrollView, Dimensions, StyleSheet
} from 'react-native'

import {signOutReq} from '../auth/reducers'
import { connect } from 'react-redux'
import STYLES from '../../styles/common'
import { getNavInfo } from '../../utils/navigation'

import { startUserMonitor, stopUserMonitor } from './reducers'

import {
  // userListReq,
  createThreadReq
} from '../chat/reducers'

const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  userItem: {
    width: windowWidth - 50,
    height: 50,
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5
  }
})

class Home extends Component {
  constructor () {
    super()
    this._signOut = this._signOut.bind(this)
    this._goToChat = this._goToChat.bind(this)
    this._renderUserList = this._renderUserList.bind(this)
  }

  componentWillUnmount () {
    this.props.dispatch(stopUserMonitor())
  }

  componentDidMount () {
    const currentUserId = this.props.auth.user.userId
    // this.props.dispatch(userListReq({currentUserId}))
    this.props.dispatch(startUserMonitor({currentUserId}))
  }

  _renderUserList () {
    const { userId } = this.props.auth.user
    if (userId) {
      const { list } = this.props.user
      return list.length
        ? list.map((user, index) => {
          return user.userId !== userId
            ? <TouchableOpacity onPress={() => this._goToChat(user)} key={index}>
              <View style={[styles.userItem, STYLES.row_space_around]}>
                <Text>{user.username}</Text>
                {/* <Text>Status: ONLINE</Text> */}
              </View>
            </TouchableOpacity>
            : null
        })
        : null
    }
  }

  _goToChat (buddy) {
    const navInfo = getNavInfo(this.props)
    const scene = { screen: 'Chat' }

    const { userId } = this.props.auth.user
    const buddyId = buddy.userId
    const threadId = userId > buddyId ? `${userId}-${buddyId}` : `${buddyId}-${userId}`
    this.props.dispatch(createThreadReq({threadId, buddy, scene, navInfo}))
  }

  _signOut () {
    this.props.dispatch(signOutReq())
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <View style={[STYLES.col_center, { flex: 1 }]}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>USERS</Text>
        </View>
        <View style={[STYLES.col_center, { flex: 6 }]}>
          <ScrollView>
            {this._renderUserList()}
          </ScrollView>
        </View>
        <View style={[STYLES.col_center, { flex: 1 }]}>
          <TouchableOpacity onPress={this._signOut}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN OUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const stateToProps = ({auth, user}) => ({auth, user})

export default connect(stateToProps, dispatch => ({dispatch}))(Home)
