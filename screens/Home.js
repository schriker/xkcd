import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({

})

const Home = ({ navigation }) => {
  return (
    <View>
      <Text onPress={() => navigation.navigate('Details')}>Home page.</Text>
    </View>
  )
}
export default Home