
import {AsyncStorage} from 'react-native'

export function setData (data) {
  return AsyncStorage.setItem('userData', JSON.stringify(data))
}

export function getData () {
  return new Promise((resolve) => {
    AsyncStorage.getItem('userData').then(data => {
      resolve(JSON.parse(data))
    })
  })
}

export function removeData () {
  return AsyncStorage.removeItem('userData')
}
