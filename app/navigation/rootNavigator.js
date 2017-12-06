
import { Navigation } from 'react-native-navigation'

import Signin from '../modules/auth/signin'
import Home from '../modules/home/index'

// app initialization action
import { init } from '../modules/auth/reducers'

// store initialization
import { Provider } from 'react-redux'
import Store from '../store/configure'

// navigation style configuration
const navigatorStyle = {

}

class Application {
  constructor (Store, Provider) {
    this._store = Store
    this._provider = Provider

    this._configureScreens = this._configureScreens.bind(this)
    this._configureScreens(Store, Provider)

    this.run = this.run.bind(this)
    this.startApp = this.startApp.bind(this)
  }

  _configureScreens (Store, Provider) {
    const screens = {
      Signin,
      Home
    }
    Object.keys(screens).map(key => {
      Navigation.registerComponent(`${key}`, () => screens[key], Store, Provider)
    })
  }

  run () {
    this._store.dispatch(init())
  }

  startApp ({ screen, title }) {
    const app = {
      screen,
      title,
      navigatorStyle
    }
    Navigation.startSingleScreenApp({ screen: app })
  }
}

export default RootNavigator = new Application(Store, Provider) // singleton
