import { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import axios from "axios";
axios.defaults.withCredentials = true
import './App.css'

function App() {
const [data, setData] = useState("")
useEffect(() => {
axios.get("/").then(res => 
  {
    console.log(res)
    setData(res.data)
  }
  )

 

}, [])

const getUser = (e) => {
e.preventDefault()
  axios.get("/").then(res => 
    {
      console.log(res)
      setData(res)
    }
    )
}

const logout = () => {
  axios.get("/logout")
}
  return (
    <>
    <Link to="/signup">Signup</Link><br></br>
    <Link to ="/login">Login</Link>
    <button type="button" onClick={logout}>Logout</button>
      <h1>data: {data ? data.first_name : ""}</h1>
      <button type="button" onClick={getUser}>Get User Info</button>
    </>
  )
}

export default App
