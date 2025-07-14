    import {
    FETCH_EMAILS,
    FETCH_EMAILS_SUCCESS,
    FETCH_EMAILS_FAILURE,
    FETCH_EMAIL_BY_ID
    } from './constants'

    const initialState = {
    loading: false,
    emails: [],
    error: null,
    }

    export default function emailReducer(state = initialState, action) {
        console.log("in tge enauk");
        
    switch (action.type) {
        case FETCH_EMAILS:
        return { ...state, loading: true, error: null }
        case FETCH_EMAILS_SUCCESS:
        return { ...state, loading: false, emails: action.emails }
        case FETCH_EMAILS_FAILURE:
        return { ...state, loading: false, error: action.error }
        case FETCH_EMAIL_BY_ID:
        return { ...state, loading: true }
        default:
        return state
    }
    }
