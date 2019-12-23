import React, { useContext } from 'react'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'
import { View, StyleSheet } from 'react-native'
import { NavigationEvents } from 'react-navigation'

import { Context as AuthContext } from '../context/AuthContext'

const SigninScreen = () => {
  const { state: { errorMessage, isSigningIn }, signin, clearErrorMessage } = useContext(AuthContext)

  return <View style={styles.container}>
    <NavigationEvents
      onWillBlur={clearErrorMessage}
    />
    <AuthForm
      errorMessage={errorMessage}
      headerText="Sign In to Your Account"
      isCallingApi={isSigningIn}
      onSubmit={signin}
      submitButtonText="Sign In"
    />
    <NavLink
      routeName="Signup"
      text="Don't have an account? Signup instead!"
    />
    {/*  */}
  </View>
}

SigninScreen.navigationOptions = {
  header: null
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

export default SigninScreen