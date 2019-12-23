/**
 * docs: this component is used in SigninScreen, SignupScreen
 */
import React, { useState } from 'react'

import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import Spacer from './Spacer'

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText, isCallingApi }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return <>
    <Spacer>
      <Text h4>{headerText}</Text>
    </Spacer>
    <Input
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={setEmail}
      label="Email"
      value={email}
    />
    <Spacer />
    <Input
      secureTextEntry
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={setPassword}
      label="Password"
      value={password}
    />
    {errorMessage ? (
      <Spacer>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </Spacer>
    ) : null}
    <Spacer>
      <Button
        title={submitButtonText}
        onPress={() => onSubmit({ email, password })}
        icon={
          isCallingApi ? <View style={{ marginRight: 5 }}>
            <ActivityIndicator
              size="small"
              color="white"
            />
          </View> : null
        }
      />
    </Spacer>
  </>
}

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red'
  },
})

export default AuthForm