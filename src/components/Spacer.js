/**
 * docs: this component is used in NavLink, AuthForm components, and AccountScreen
 */

import React from 'react'
import { View, StyleSheet } from 'react-native'

const Spacer = ({ children }) => {
  return <View style={styles.spacer}>
    {children}
  </View>
}

const styles = StyleSheet.create({
  spacer: {
    margin: 15
  }
})

export default Spacer