import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    flex: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  cardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 10
  },
  imageWrapper: {
    flex: 1,
    height: 300,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    padding: 20
  },
  image: {
    width: '100%',
    height: '100%'
  },
  title: {
    flexShrink: 1
  }
})

const ComicCard = ({ comicData: { item: comic }, navigation }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.6} onPress={() => navigation.navigate('Details', {comic})}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={{ uri: comic.img }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.cardTitle}>
        <Text style={styles.title}>{comic.title}</Text>
        <Text>{`${comic.day}.${comic.month}.${comic.year}`}</Text>
      </View>
    </TouchableOpacity>
  )
}
export default ComicCard
