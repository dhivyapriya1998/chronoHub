// emailSaga.js
import { call, put, takeLatest } from 'redux-saga/effects'
import {
  fetchEmailsSuccess,
  fetchEmailsFailure,
} from './actions'
import {
  FETCH_EMAILS,
  FETCH_EMAIL_BY_ID, 
} from './constants'
import api from '../../services/api'

// List all emails
function* fetchEmailsWorker() {
  try {
    console.log("Hiiii");
    const response = yield call(api.fetchEmails)
    yield put(fetchEmailsSuccess(response))
  } catch (error) {
    yield put(fetchEmailsFailure(error.message))
  }
}

function* fetchEmailByIdWorker(action) {
  try {
    console.log("Heelloooo");
    const id = action.payload
    const response = yield call(api.fetchEmailById, id)
    yield put(fetchEmailsSuccess(response)) // You can create a separate action if needed
  } catch (error) {
    yield put(fetchEmailsFailure(error.message))
  }
}

// Root saga
export default function* emailSaga() {
  console.log("Oiiiii");
  yield takeLatest(FETCH_EMAILS, fetchEmailsWorker)
  yield takeLatest(FETCH_EMAIL_BY_ID, fetchEmailByIdWorker) 
}
