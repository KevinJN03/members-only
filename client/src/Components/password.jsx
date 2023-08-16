import { useEffect, useState, useRef } from "react";
import hide from "../assets/hide.png";
import show from "../assets/visible.png";


function Password(){
const [password, setPassword] = useState('')
    const visible = useRef();
    const passwordType = useRef();

    const changeVisibility = () => {
        passwordType.current.type === "password" && password.length > 0
          ? (passwordType.current.type = "text") && (visible.current.src = show)
          : (passwordType.current.type = "password") &&
            (visible.current.src = hide);
      };

    return(
        <>
 <section className="flexrow " id="password-section">
          <input
            ref={passwordType}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
          <div id="password_image_wrapper" onClick={changeVisibility}>
            <img id="password_image" src={hide} ref={visible} />
          </div>
        </section>
        </>
    )
}


export default Password