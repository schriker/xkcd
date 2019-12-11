import { useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native'

const useFavs = () => {
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

  return [
    favs,
    favHandler
  ]
}

export default useFavs