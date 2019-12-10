import React, { useEffect, useState } from 'react'
import ComicCard from '../components/ComicCard'
import {
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2'
  },
  cardsWrapper: {
    paddingTop: 10,
    paddingHorizontal: 20
  }
})

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [comics, setComics] = useState([])

  const fetchComics = async () => {
    try {
      const amountOfCommics = 8
      const fetchedComics = []

      for (let i = 0; i < amountOfCommics; i++) {
        let url = 'https://xkcd.com/info.0.json'
        if (comics.length > 0) {
          // This should be trigered for load more
          url = `https://xkcd.com/${comics[comics.length].num - i}/info.0.json`
        } else if (fetchedComics.length > 0) {
          url = `https://xkcd.com/${fetchedComics[0].num - i}/info.0.json`
        }
        const comic = await (await fetch(url)).json()
        fetchedComics.push(comic)
      }

      setComics(fetchedComics)
      setIsLoading(false)
    } catch (error) {}
  }

  useEffect(() => {
    fetchComics()
  }, [])

  let content = <ActivityIndicator size="large" color="#3a4bd1" />

  if (!isLoading && comics.length > 0) {
    content = (
      <FlatList
        style={styles.cardsWrapper}
        data={comics}
        keyExtractor={comic => `${comic.num}`}
        renderItem={comic => <ComicCard navigation={navigation} comicData={comic} />}
      />
    )
  } else if (!isLoading) {
    content = <Text>Error!</Text>
  }

  return <View style={styles.container}>{content}</View>
}
export default Home
