import React from 'react'
import EmailList from '../app/containers/emailList/emailList'
import EmailItem from './containers/emailList/emailItem'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path = '/' element = {<EmailList/>}/>
          <Route path = "/emails/:id" element = {<EmailItem/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
