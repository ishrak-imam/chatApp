
import * as fireBase from 'firebase'

const fireBaseConfig = {
  apiKey: 'AIzaSyD-fYNh5ua1_Gadip-RMXj15HcjwbMde4A',
  authDomain: 'chatapp-a95cf.firebaseapp.com',
  databaseURL: 'https://chatapp-a95cf.firebaseio.com',
  projectId: 'chatapp-a95cf',
  storageBucket: 'chatapp-a95cf.appspot.com',
  messagingSenderId: '657404740315'
}

fireBase.initializeApp(fireBaseConfig)

const database = fireBase.database()

export function register (payload) {
  const {email, password} = payload
  return fireBase.auth().createUserWithEmailAndPassword(email, password)
}

export function setUserData (obj) {
  const { username, email, userId } = obj
  return database.ref('users/' + userId).set({
    userId, username, email
  })
}

export function getUserList () {
  return database.ref('users').once('value')
}

export function signIn (payload) {
  const {email, password} = payload
  return fireBase.auth().signInWithEmailAndPassword(email, password)
}

export function setDisplayName (payload) {
  const {displayName} = payload
  const user = fireBase.auth().currentUser
  return user.updateProfile({displayName})
}

export function onAuthStateChanged (payload) {
  fireBase.auth().onAuthStateChanged(payload)
}

export function signOut () {
  fireBase.auth().signOut()
}

export default database
