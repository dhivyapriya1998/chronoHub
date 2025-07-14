// src/store/reducers.js
import { combineReducers } from 'redux'
import emailReducer from '../app/containers/emailList/reducers'

export default function createReducer(asyncReducers = {}) {
  return combineReducers({
    emailList: emailReducer,
    ...asyncReducers,
  })
}
