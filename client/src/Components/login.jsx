import React from "react";
import {useEffect, useState, UseRef} from "react";
import Password from "./password";

function Login(){
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

return(
    <>
    <form>
        <input type="email" name="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
        <Password/>
        <buuton type="submit">Submit</buuton>
    </form>
    </>
)

}

export default Login