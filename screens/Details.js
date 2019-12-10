import React from 'react'
import { View, StyleSheet, Image } from 'react-native'

const styles = StyleSheet.create({})

const Details = ({ navigation }) => {
  const comic = navigation.getParam('comic', '')

  return (
    <View>
      <Image
        style={{ width: '100%', height: '100%' }}
        source={{ uri: comic.img }}
      ></Image>
    </View>
  )
}
export default Details
