import React from 'react'
import useFavs from '../hooks/useFavs'
import useFetchComics from '../hooks/useFetchComics'
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
  const [favs, favHandler] = useFavs()
  const {
    comics,
    fetchComics,
    isRefreshing,
    setIsRefreshing,
    isLoading,
    isLoadingMore
  } = useFetchComics()

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
          <ComicCard
            navigation={navigation}
            comicData={comic}
            favHandler={favHandler}
            favs={favs}
          />
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
