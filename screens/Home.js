import React, { useEffect, useState } from 'react'
import { ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [comics, setComics] = useState([])

  useEffect(() => {
    (async function() {
      try {
        const amountOfCommics = 8
        const fetchedComics = []
        const latestComic = await (
          await fetch('https://xkcd.com/info.0.json')
        ).json()
        fetchedComics.push(latestComic)

        for (let i = latestComic.num - 1; i > latestComic.num - amountOfCommics; i --) {
          const comic = await (
            await fetch(`https://xkcd.com/${i}/info.0.json`)
          ).json()
          fetchedComics.push(comic)
        }
        setComics(fetchedComics)
        setIsLoading(false)
      } catch (error) {}
    })()
  }, [])

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3a4bd1" />
    </View>
  )
}
export default Home
