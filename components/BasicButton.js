import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3a4bd1',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 5
  },
  text: {
    color: '#ffffff',
    fontSize: 16
  }
})

const LoadMore = ({ children, pressCallback, isDisabled }) => {
  return (
    <TouchableOpacity onPress={pressCallback} disabled={isDisabled}>
      <View style={styles.container}>
        {!isDisabled && <Text style={styles.text}>{children}</Text>}
        {isDisabled && <ActivityIndicator size="small" color="#ffffff" />}
      </View>
    </TouchableOpacity>
  )
}
export default LoadMore
