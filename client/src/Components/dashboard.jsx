import React from "react";
import {useState} from "react"
import axios from "axios"
function DashBoard(){
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")

    const postData = () => {
        axios.get("/message/create")
    }
return (
    <>
    <form onSubmit={(e)=> e.preventDefault()}>
        <input type="text" value={title} name="title" placeholder="title" onChange={(e) => setTitle(e.target.value)}></input>
        <input type="text" name="text" value={text} placeholder="title" onChange={(e) => setText(e.target.value)}></input>
        <button onClick={postData}>Submit</button>
    </form>
    </>
)
}

export default DashBoard