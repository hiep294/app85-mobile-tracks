import { AsyncStorage } from 'react-native'
import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'
import { navigate } from '../navigationRef'

const SIGNUP = 'SIGNUP'
const SIGNUP_ERROR = 'SIGNUP_ERROR'
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
const SIGNIN = 'SIGNIN'
const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
const SIGNIN_ERROR = 'SIGNIN_ERROR'
const CLEAR_ERROR_MESSAGE = 'CLEAR_ERROR_MESSAGE'
const SIGNOUT = 'SIGNOUT'

const initialState = {
  isSigningIn: false,
  isSigningUp: false,
  token: null,
  errorMessage: ''
}

const authReducer = (state, action) => {
  switch (action.type) {
    case SIGNUP:
      return { ...state, isSigningUp: true }
    case SIGNUP_ERROR:
      return { ...state, token: null, errorMessage: action.payload, isSigningUp: false }
    case SIGNUP_SUCCESS:
      return { ...state, token: action.payload, errorMessage: '', isSigningUp: false }
    case SIGNIN:
      return { ...state, isSigningIn: true }
    case SIGNIN_ERROR:
      return { ...state, token: null, errorMessage: action.payload, isSigningIn: false }
    case SIGNIN_SUCCESS:
      return { ...state, token: action.payload, errorMessage: "", isSigningIn: false }
    case CLEAR_ERROR_MESSAGE:
      return { ...state, errorMessage: '' }
    case SIGNOUT:
      return { ...state, token: null, errorMessage: '' }
    default: return state
  }
}

const clearErrorMessage = dispatch => () => {
  dispatch({
    type: CLEAR_ERROR_MESSAGE
  })
}

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token')

  if (token) {
    dispatch({ type: SIGNIN_SUCCESS, payload: token })
    return navigate('TrackList')
  }

  navigate('loginFlow')
}

const signup = dispatch => async ({ email, password }) => {
  dispatch({
    type: SIGNUP
  })

  const signupError = (message) => {
    dispatch({
      type: SIGNUP_ERROR,
      payload: message
    })
  }

  const signupSuccess = async (token) => {
    await AsyncStorage.setItem('token', token)
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: token
    })
    navigate('TrackList')
  }

  try {
    const response = await trackerApi.post('/signup', { email, password })
    signupSuccess(response.data.token)
  } catch (err) {
    signupError("Something went wrong with sign up")
  }
}

const signin = dispatch => async ({ email, password }) => {
  dispatch({
    type: SIGNIN
  })

  const signinSuccess = async (token) => {
    await AsyncStorage.setItem('token', token)
    dispatch({
      type: SIGNIN_SUCCESS,
      payload: token
    })
    navigate('TrackList')
  }

  const signinError = (message) => {
    dispatch({
      type: SIGNIN_ERROR,
      payload: message
    })
  }

  try {
    const response = await trackerApi.post('/signin', { email, password })
    signinSuccess(response.data.token)
  } catch (err) {
    signinError('Something went wrong with sign in')
  }
}

const signout = dispatch => async () => {
  await AsyncStorage.removeItem('token')
  dispatch({
    type: SIGNOUT
  })
  navigate('loginFlow')
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  initialState
) 