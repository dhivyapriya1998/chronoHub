// src/store/configureStore.js
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createReducer from './reducers' // ✅ This returns combineReducers
import rootSaga from './rootSaga'      // ✅ Root saga

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware()

  const middlewares = [sagaMiddleware]
  const enhancers = [applyMiddleware(...middlewares)]

  const store = createStore(
    createReducer(), // ✅ Correctly create the reducer
    initialState,
    compose(...enhancers)
  )

  // ✅ Run the root saga
  store.runSaga = sagaMiddleware.run
  store.runSaga(rootSaga)

  return store
}
