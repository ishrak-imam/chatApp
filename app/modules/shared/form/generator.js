import React, {Component} from 'react'
import {
  View, Text, TextInput,
  TouchableOpacity
} from 'react-native'

import { FORM, ERROR_COLOR } from './config'

import { Field, reduxForm } from 'redux-form'

import STYLES from '../../../styles/common'

const validate = (values, props) => {
  return props.config.validate(values)
}

class Form extends Component {
  constructor (props) {
    super(props)
    this._renderInput = this._renderInput.bind(this)
    this._renderInputs = this._renderInputs.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  _renderInput ({ input, config, meta: { touched, error } }) {
    const wrapStyle = (touched && error)
                        ? {...FORM.INPUT_WRAP, borderColor: ERROR_COLOR}
                        : FORM.INPUT_WRAP
    return (
      <View style={{marginTop: 10}}>
        <View style={wrapStyle}>
          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            style={FORM.TEXTINPUT_STYLE}
            {...input} {...config}
          />
        </View>
        {touched && error && <Text style={FORM.ERROR_STYLE}>{error}</Text>}
      </View>
    )
  }

  _renderInputs () {
    const {config} = this.props
    return config.fields.map(field => {
      return (
        <Field key={field.name} name={field.name} config={field} component={this._renderInput} />
      )
    })
  }

  _handleSubmit (value) {
    const {valid} = this.props
    if (valid) {
      this.props.onSubmit(value)
    }
  }

  render () {
    const { handleSubmit, config } = this.props
    return (
      <View>
        {this._renderInputs()}
        <View style={[STYLES.col_center, {marginTop: 20}]}>
          <TouchableOpacity onPress={handleSubmit(this._handleSubmit)}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{config.submitText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default reduxForm({
  validate
})(Form)
