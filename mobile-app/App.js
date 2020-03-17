import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { AppLoading } from 'expo'
import { bootstrap } from './src/bootstrap'
import AppNavigation from './src/navigation/AppNavigation'
import store, { setPosts, getPosts } from './src/store'
import { useDispatch } from 'react-redux'
import { DATA } from './assets/data'
const App = () => {
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
   dispatch(getPosts())
  })
  
  if (!isReady) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => setIsReady(true)}
        onError={err => console.log(err)}
      />
    )
  }

  return <AppNavigation/>
}

export default () => <Provider store={store}><App /></Provider>
