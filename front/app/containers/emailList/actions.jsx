import {
  FETCH_EMAILS,
  FETCH_EMAIL_BY_ID,
  FETCH_EMAILS_SUCCESS,
  FETCH_EMAILS_FAILURE,
} from './constants'

export const fetchEmails = () => ({ type: FETCH_EMAILS })
export const fetchEmailsSuccess = (emails) => ({ type: FETCH_EMAILS_SUCCESS, emails })
export const fetchEmailsFailure = (error) => ({ type: FETCH_EMAILS_FAILURE, error })
export const fetchEmailById = (id) =>{
  console.log("helelloo", id)
  return{
   type: FETCH_EMAIL_BY_ID, payload: id
  }
}