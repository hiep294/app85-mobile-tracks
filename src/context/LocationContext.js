/**
 * description: handle with GPS api
 */
import createDataContext from './createDataContext'

const ADD_CURRENT_LOCATION = 'ADD_CURRENT_LOCATION'
const START_RECORDING = 'START_RECORDING'
const STOP_RECORDING = 'STOP_RECORDING'
const ADD_LOCATION = 'ADD_LOCATION'
const CHANGE_NAME = 'CHANGE_NAME'
const RESET = 'RESET'

const initialState = {
  recording: false,
  locations: [],
  currentLocation: null,
  name: ''
}

const locationReducer = (state, action) => {
  switch (action.type) {
    case ADD_CURRENT_LOCATION:
      return { ...state, currentLocation: action.payload }
    case START_RECORDING:
      return { ...state, recording: true }
    case STOP_RECORDING:
      return { ...state, recording: false }
    case ADD_LOCATION:
      return { ...state, locations: [...state.locations, action.payload] }
    case CHANGE_NAME:
      return { ...state, name: action.payload }
    case RESET:
      return { ...state, name: '', locations: [] }
    default:
      return state;
  }
}

const reset = dispatch => () => {
  dispatch({ type: RESET })
}

const changeName = dispatch => (name) => {
  dispatch({ type: CHANGE_NAME, payload: name })
}

const startRecording = dispatch => () => {
  dispatch({ type: START_RECORDING })
}

const stopRecording = dispatch => () => {
  dispatch({ type: STOP_RECORDING })
}

const addLocation = dispatch => (location, recording) => {
  dispatch({
    type: ADD_CURRENT_LOCATION,
    payload: location
  })
  if (recording) {
    dispatch({ type: ADD_LOCATION, payload: location })
  }
}

export const { Context, Provider } = createDataContext(
  locationReducer,
  { changeName, startRecording, stopRecording, addLocation, reset },
  initialState
)