
import React, {Component} from 'react'
import Form from './generator'

import {connect} from 'react-redux'

class Container extends Component {
  render () {
    return <Form {...this.props} />
  }
}

function mapStateToProps (state, props) {
  return {
    form: props.config.name,
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Container)
