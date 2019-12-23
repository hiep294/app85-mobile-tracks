const LESSION = '15.64'
import React, { useContext } from 'react'
import { Provider as AuthProvider } from './src/context/AuthContext'
import { Provider as LocationProvider } from './src/context/LocationContext'
import { Provider as TrackProvider, Context as TrackContext } from './src/context/TrackContext'
import { setNavigator } from './src/navigationRef'

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SigninScreen from './src/screens/SigninScreen'
import SignupScreen from './src/screens/SignupScreen'
import AccountScreen from './src/screens/AccountScreen'
import TrackCreateScreen from './src/screens/TrackCreateScreen'
import TrackDetailScreen from './src/screens/TrackDetailScreen'
import TrackListScreen from './src/screens/TrackListScreen'
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { FontAwesome } from '@expo/vector-icons'
import { ActivityIndicator } from 'react-native'

const trackListFlow = createStackNavigator({
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen
})

trackListFlow.navigationOptions = () => {
  const TabBarIcon = () => {
    const { state: { isFetchingTracks } } = useContext(TrackContext)
    return isFetchingTracks
      ? <ActivityIndicator size={20} />
      : <FontAwesome name="th-list" size={20} />
  }
  return {
    title: 'Tracks',
    tabBarIcon: <TabBarIcon />
  }
}

const switchNavigator = createSwitchNavigator({
  ResultAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen,
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow,
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen
  })
})

const App = createAppContainer(switchNavigator)

export default () => (
  <AuthProvider>
    <LocationProvider>
      <TrackProvider>
        <App ref={setNavigator} />
      </TrackProvider>
    </LocationProvider>
  </AuthProvider>
)