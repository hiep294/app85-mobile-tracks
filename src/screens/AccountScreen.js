import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import Spacer from '../components/Spacer'
import { Context as AuthContext } from '../context/AuthContext'
import { FontAwesome } from '@expo/vector-icons'

const AccountScreen = ({ navigation }) => {
  const { signout } = useContext(AuthContext)

  return <SafeAreaView>
    <Text h4>Account Screen</Text>
    <Spacer>
      <Button
        title="Signout"
        onPress={signout}
      />
    </Spacer>
  </SafeAreaView>
}

AccountScreen.navigationOptions = {
  title: 'Account',
  tabBarIcon: <FontAwesome name="gear" size={20} />
}

const styles = StyleSheet.create({})

export default AccountScreen