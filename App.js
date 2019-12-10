import Home from './screens/Home'
import Details from './screens/Details'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

const MainNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    Details: { screen: Details }
  },
  {
    defaultNavigationOptions: {
      title: 'XKCD',
      headerBackTitle: 'Back',
      headerStyle: {
        backgroundColor: '#3a4bd1'
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        color: '#ffffff'
      }
    }
  }
)

const App = createAppContainer(MainNavigator)

export default App
