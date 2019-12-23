import React, { useContext } from 'react'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'
import { NavigationEvents } from 'react-navigation'

import { View, StyleSheet } from 'react-native'

import { Context as AuthContext } from '../context/AuthContext'

const SignupScreen = () => {
  const { state: { errorMessage, isSigningUp }, signup, clearErrorMessage } = useContext(AuthContext)

  return <>
    <View style={styles.container}>
      <NavigationEvents
        onWillBlur={clearErrorMessage}
      />
      <AuthForm
        errorMessage={errorMessage}
        headerText="Sign Up for Tracker"
        isCallingApi={isSigningUp}
        onSubmit={signup}
        submitButtonText="Sign Up"
      />
      <NavLink
        routeName="Signin"
        text="Already have an account? Sign in instead!"
      />
      {/*  */}
    </View>
  </>
}

SignupScreen.navigationOptions = () => {
  return {
    header: null
  }
}

const styles = StyleSheet.create({
  container: {
    // borderColor: 'red',
    // borderWidth: 10,
    flex: 1,
    justifyContent: 'center',
    marginBottom: 50
  },
})

export default SignupScreen