import { useState, useEffect } from 'react'
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync
} from 'expo-location'

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null)


  useEffect(() => {
    let subscriber

    // should define helper function which reference props or state or context in useEffect, to easily look them changed
    const startWatching = async () => {
      try {
        await requestPermissionsAsync()
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10
          },
          callback
        )
      } catch (e) {
        setErr(e)
      }
    }

    //
    if (shouldTrack) {
      startWatching() // helper function
    } else {
      if (subscriber) subscriber.remove()
      subscriber = null
    }

    // console.log('will unmount - will cleanup')
    return () => {
      if (subscriber) subscriber.remove()
    }
  }, [shouldTrack, callback])

  return [err]
}