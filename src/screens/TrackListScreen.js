import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import Spacer from '../components/Spacer'
import { Button } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation'
import { ListItem } from 'react-native-elements'
import { Context as TrackContext } from '../context/TrackContext'

const TrackListScreen = ({ navigation }) => {
  const { state: { tracks, errorFetchTracks }, fetchTracks } = useContext(TrackContext)

  return <>
    <NavigationEvents onWillFocus={fetchTracks} />
    <Text style={{ fontSize: 48 }}>TrackListScreen</Text>
    {
      errorFetchTracks ? (<Spacer>
        <Text style={{ color: 'red' }}>{errorFetchTracks}</Text>
      </Spacer>
      ) : (
          <FlatList
            data={tracks}
            keyExtractor={item => item._id}
            renderItem={({ item }) => {
              return <TouchableOpacity onPress={() => {
                navigation.navigate('TrackDetail', { _id: item._id })
              }}>
                <ListItem chevron title={item.name} />
              </TouchableOpacity>
            }}
          />
        )
    }
  </>
}

TrackListScreen.navigationOptions = {
  title: 'Tracks'
}

const styles = StyleSheet.create({})

export default TrackListScreen