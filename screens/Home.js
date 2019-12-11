import React, { useEffect, useState } from 'react'
import ComicCard from '../components/ComicCard'
import BasicButton from '../components/BasicButton'
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  cardsWrapper: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 50
  }
})

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [comics, setComics] = useState([])

  const fetchComics = async () => {
    try {
      setIsLoadingMore(true)
      const amountOfCommics = 8
      const fetchedComics = []
      for (let i = 0; i < amountOfCommics; i++) {
        let url = 'https://xkcd.com/info.0.json'
        if (comics.length > 0) {
          url = `https://xkcd.com/${comics[comics.length - 1].num - i - 1}/info.0.json`
        } else if (fetchedComics.length > 0) {
          url = `https://xkcd.com/${fetchedComics[0].num - i}/info.0.json`
        }
        const comic = await (await fetch(url)).json()
        fetchedComics.push(comic)
      }
      if (comics.length > 0) { 
        setComics(prevComics => [...prevComics, ...fetchedComics])
      } else {
        setComics(fetchedComics)
      }
      setIsLoading(false)
      setIsLoadingMore(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchComics()
  }, [])

  let content = <ActivityIndicator size="large" color="#3a4bd1" />

  if (!isLoading && comics.length > 0) {
    content = (
        <FlatList
          contentContainerStyle={styles.cardsWrapper}
          data={comics}
          keyExtractor={comic => `${comic.num}`}
          renderItem={comic => <ComicCard navigation={navigation} comicData={comic} />}
          ListFooterComponent={<BasicButton isDisabled={isLoadingMore} pressCallback={fetchComics}>Load More</BasicButton>}
        />
    )
  } else if (!isLoading) {
    content = <Text>Error!</Text>
  }

  return <View style={styles.container}>{content}</View>
}
export default Home
