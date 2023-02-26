import React from 'react'
import Login from './comps/Login'
import Signup from './comps/Signup'
import Home from './comps/Home'
import Styles from './App.module.css'
import { Route, Routes } from 'react-router-dom'


export default function App() {
  
  
  return (
    <div>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </div>
  )
}


