import "./Login.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

const Login=()=> {

  const navigate = useNavigate();

    const login = (mail, password) => {
        if( mail === "admin" && password === "a"){
                
            
        }
        else if(mail === "investigador" && password === "a"){

        }
        else alert("Usuario incorrecto");
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