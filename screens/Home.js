import React, { useEffect, useState } from 'react'
import { AsyncStorage } from 'react-native'
import ComicCard from '../components/ComicCard'
import BasicButton from '../components/BasicButton'
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2'
  },
  cardsWrapper: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  text: {
    alignSelf: 'center'
  }
})

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(true)
  const [comics, setComics] = useState([])

  const fetchComics = async () => {
    try {
      setIsLoadingMore(true)
      const amountOfCommics = 8
      const fetchedComics = []
      for (let i = 0; i < amountOfCommics; i++) {
        let url = 'https://xkcd.com/info.0.json'
        if (comics.length > 0 && !isRefreshing) {
          url = `https://xkcd.com/${comics[comics.length - 1].num - i - 1}/info.0.json`
        } else if (fetchedComics.length > 0) {
          url = `https://xkcd.com/${fetchedComics[0].num - i}/info.0.json`
        }
        const comic = await (await fetch(url)).json()
        fetchedComics.push(comic)
      }
      if (comics.length > 0 && !isRefreshing) {
        setComics(prevComics => [...prevComics, ...fetchedComics])
      } else {
        setComics(fetchedComics)
      }
      setIsLoading(false)
      setIsRefreshing(false)
      setIsLoadingMore(false)
    } catch (error) {
      setIsLoading(false)
      setIsRefreshing(false)
      setIsLoadingMore(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (isRefreshing) {
      fetchComics()
    }
  }, [isRefreshing])

  const [favs, setFavs] = useState([])

  useEffect(() => {
    (async function(){
      try {
        const favsFromStorage = await AsyncStorage.getItem('Favs')
        if (favsFromStorage !== null) {
          setFavs(JSON.parse(favsFromStorage))
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  useEffect(() => {
    (async function(){
      await AsyncStorage.setItem('Favs', JSON.stringify(favs))
    })()
  }, [favs])

  const favHandler = async (id) => {
    try {
      setFavs(prevFavs => {
        if (favs.includes(id)) {
          const removedFavs = prevFavs.filter(fav => fav !== id)
          return removedFavs
        } else {
          return [...prevFavs, id]
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  let content = <ActivityIndicator size="large" color="#3a4bd1" />

  if (!isLoading && comics.length > 0) {
    content = (
      <FlatList
        data={comics}
        refreshing={isRefreshing}
        keyExtractor={comic => `${comic.num}`}
        onRefresh={() => setIsRefreshing(true)}
        contentContainerStyle={styles.cardsWrapper}
        renderItem={comic => (
          <ComicCard navigation={navigation} comicData={comic} favHandler={favHandler} favs={favs} />
        )}
        ListFooterComponent={
          <BasicButton isDisabled={isLoadingMore} pressCallback={fetchComics}>
            Load More
          </BasicButton>
        }
      />
    )
  } else if (!isLoading) {
    content = <Text style={styles.text}>Error!</Text>
  }

  return <View style={styles.container}>{content}</View>
}
export default Home
