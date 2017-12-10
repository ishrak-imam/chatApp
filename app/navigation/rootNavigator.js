
import { Navigation } from 'react-native-navigation'

import Signin from '../modules/auth/signin'
import Register from '../modules/auth/register'
import Home from '../modules/home/index'
import Chat from '../modules/chat/index'

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

    this.startApp = this.startApp.bind(this)
  }

  _configureScreens (Store, Provider) {
    const screens = {
      Signin,
      Register,
      Home,
      Chat
    }
    Object.keys(screens).map(key => {
      Navigation.registerComponent(`${key}`, () => screens[key], Store, Provider)
    })
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

const RootNavigator = new Application(Store, Provider)

export default RootNavigator
