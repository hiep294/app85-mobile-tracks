import React, { useContext } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { Input, Button, Text } from 'react-native-elements'
import Spacer from './Spacer'
import { Context as LocationContext } from '../context/LocationContext'
import { Context as TrackContext } from '../context/TrackContext'
import useSaveTrack from '../hook/useSaveTrack'

const TrackForm = () => {
  const { state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeName
  } = useContext(LocationContext)

  const { state: { isCreatingTrack, errorCreateTrack } } = useContext(TrackContext)
  const [saveTrack] = useSaveTrack()
  return <>
    <Spacer>
      <Input value={name} onChangeText={changeName} placeholder="Enter Name" />
    </Spacer>
    <Spacer>
      {
        recording
          ? <Button title="Stop" onPress={stopRecording} />
          : <Button title="Start Recording" onPress={startRecording} />
      }
    </Spacer>

    {
      !recording && locations.length
        ? (
          <Spacer>
            <Button
              title="Save Recording"
              onPress={saveTrack}
              icon={
                isCreatingTrack ? <View style={{ marginRight: 5 }}>
                  <ActivityIndicator
                    size="small"
                    color="white"
                  />
                </View> : null
              }
            />
          </Spacer>
        ) : null
    }
    {
      errorCreateTrack
        ? <Text style={styles.error}>{errorCreateTrack}</Text>
        : null
    }

  </>
}

const styles = StyleSheet.create({
  error: {
    marginHorizontal: 15,
    color: 'red'
  }
})
export default TrackForm