// src/sagas/rootSaga.js
import { all } from 'redux-saga/effects'
import emailSaga from '../app/containers/emailList/saga'

export default function* rootSaga() {
  yield all([
    emailSaga(), 
  ])
}
