import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'
import { navigate } from '../navigationRef'

const CREATE_TRACK = 'CREATE_TRACK'
const CREATE_TRACK_ERROR = 'CREATE_TRACK_ERROR'
const CREATE_TRACK_SUCCESS = 'CREATE_TRACK_SUCCESS'
const FETCH_TRACKS = 'FETCH_TRACKS'
const FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR'
const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS'

const initialState = {
  tracks: [],
  isFetchingTracks: false,
  errorFetchTracks: '',

  isCreatingTrack: false,
  errorCreateTrack: ''
}

const trackReducer = (state, action) => {
  switch (action.type) {
    case CREATE_TRACK:
      return { ...state, isCreatingTrack: true }
    case CREATE_TRACK_ERROR:
      return { ...state, isCreatingTrack: false, errorCreateTrack: action.payload }
    case CREATE_TRACK_SUCCESS:
      return { ...state, isCreatingTrack: false, errorCreateTrack: '' }
    case FETCH_TRACKS:
      return { ...state, isFetchingTracks: true }
    case FETCH_TRACKS_ERROR:
      return {
        ...state,
        isFetchingTracks: false,
        errorFetchTracks: action.payload
      }
    case FETCH_TRACKS_SUCCESS:
      return {
        ...state,
        isFetchingTracks: false,
        errorFetchTracks: '',
        tracks: action.payload
      }
    case RESET: return initialState
    default: return state
  }
}

const fetchTracks = dispatch => async () => {
  dispatch({ type: FETCH_TRACKS })

  const fetchTracksSuccess = (tracks) => {
    dispatch({ type: FETCH_TRACKS_SUCCESS, payload: tracks })
  }

  const fetchTracksError = (message) => {
    dispatch({ type: FETCH_TRACKS_ERROR, payload: message })
  }

  try {
    const response = await trackerApi.get('/tracks')
    fetchTracksSuccess(response.data)
  } catch (err) {
    fetchTracksError('Fetch tracks went wrong!')
  }
}

const createTrack = dispatch => async (locationValue) => {
  dispatch({ type: CREATE_TRACK })

  const {
    state: { locations, name },
    reset
  } = locationValue

  const createTrackSuccess = () => {
    dispatch({ type: CREATE_TRACK_SUCCESS })
    reset()
    navigate('TrackList')
  }

  const createTrackError = (message) => dispatch({ type: CREATE_TRACK_ERROR, payload: message })

  try {
    await trackerApi.post('/tracks', { name, locations })
    createTrackSuccess()
  } catch (err) {
    // console.log(err.message)
    createTrackError('Save track went wrong!')
  }
}

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack },
  initialState
)