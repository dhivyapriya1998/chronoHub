import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import configureStore from './store'
import rootSaga from './rootSaga'
import { BrowserRouter } from 'react-router-dom'
const store = configureStore()
store.runSaga(rootSaga)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
