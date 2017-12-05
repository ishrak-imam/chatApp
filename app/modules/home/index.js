
import React, {Component} from 'react'
import {View, Text} from 'react-native'

import Realm from 'realm'

export default class Home extends Component {
  constructor () {
    super()
    this.state = {realm: null}
  }

  componentWillMount () {
    Realm.open({
      schema: [{name: 'DOG', properties: {name: 'string', breed: 'string'}}]
    }).then(realm => {
      realm.write(() => {
        realm.create('DOG', {name: 'Richard Parker', breed: 'a'})
        realm.create('DOG', {name: 'Richard Parker', breed: 'b'})
        realm.create('DOG', {name: 'Richard Parker', breed: 'c'})
      })
      // this.setState({realm})
      const dogs = realm.objects('DOG')
      console.log(Array.from(dogs))
    })
  }

  render () {
    // const {realm} = this.state
    // if (realm) {
    //   const dogs = realm.objects('DOG')
    //   const a = dogs.filtered('breed = "b"')
    //   console.log(a)
    // }
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home page</Text>
      </View>
    )
  }
}
