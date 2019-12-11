import { useState, useEffect } from 'react'

const useFetchComics = () => {
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

  return {
    comics,
    fetchComics,
    isRefreshing,
    setIsRefreshing,
    isLoading,
    isLoadingMore
  }
}

export default useFetchComics