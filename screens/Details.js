import React from 'react'
import { View, StyleSheet, Image } from 'react-native'

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%'
  },
  wrapper: {
    padding: 20
  }
})

const Details = ({ navigation }) => {
  const comic = navigation.getParam('comic', '')

  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.image}
        source={{ uri: comic.img }}
        resizeMode="contain"
      ></Image>
    </View>
  )
}
export default Details
