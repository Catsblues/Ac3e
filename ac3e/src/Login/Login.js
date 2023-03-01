import "./Login.css";
import {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Login=()=> {
  const navigate = useNavigate();
  const [change, setChange] = useState("no");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("creado token");
    if (token) {
      console.log("evaluemos token");
      const decodedToken = jwt_decode(token);
      if (decodedToken.rol === "admin") {
        navigate("/inicioAdmin");
        console.log("admin");
      } else if (decodedToken.rol === "user") {
        navigate("/inicio");
        console.log("user");
      }
    } else {
      navigate("/");
    }
    setChange("no");
  }, [navigate, change]);

  

  const login = (mail, password) => {
    let data = {'user':mail, 'password':password};
    fetch("http://localhost:5001/login/newToken",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.token){
        localStorage.setItem("token", data.token);
        setChange("si");
      }
      else{
        alert("User or password incorrect. Try again.");
      }
    })
    
  }


  return (
    <>
    <div className='header'> 
      <img className="logo" src={"/ac3e.png"}/>
    </div>
    <div className='contenedor'>
    <p className="titleform">Welcome</p>
    </div>
    <form className="formulario1" onSubmit={ev => {
            ev.preventDefault();

            const mail = ev.target.mail.value;
            const password = ev.target.password.value;

            login(mail, password);
            }}>
            <div className="contnmail">
                <label>Mail</label>
				<input type="text" name="mail" id="mail"  className="mail" autoComplete="off"/>
            </div>
            <div>
                <label>Password</label>
				<input type="text" name="password" id="password" className="password" autoComplete="off"/>
            </div>
          <button type="submit">Submit</button>
        </form>
    </>
  );
}

export default Login;