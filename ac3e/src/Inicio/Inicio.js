import "./Inicio.css";
import Campos from "./Components_Inicio/Campos.js";
import React from "react";
import Exit from "../Login/Exit.js";
import ChangePass from "./Components_Inicio/ChangePass";
import {useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Inicio=()=> {

  const [name_researcher, setName_researcher] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
    else{
      const decodedToken = jwt_decode(token);
      if (decodedToken.rol !== "user") {
        navigate("/inicioAdmin");
      }
      else{
        setName_researcher(decodedToken.name);
      }
    }
  }, []);

  return (
    <>
    
    <div className='header'> 
      <img className="logo" src={"/ac3e.png"}/>
      <div className='usuario'>
        <h1 className="titulo1">Welcome {name_researcher}</h1>
      </div>
      <a className="statistics" href="https://app.powerbi.com/view?r=eyJrIjoiOGFhN2I3MzQtY2FlZS00YjQzLWIzNTktNTgwNDNmMWU1MTQxIiwidCI6IjAyNjI1Njc2LTMyMjctNDQwYS05YzY4LWJiNmQyOWRlNDIwNiIsImMiOjR9" target="_blank">Statistics</a>
      <button className="update" onClick={()=>setShow(true)}>Update password</button>
      <button className="exit" onClick={Exit}>Exit</button>
    </div>
    <h1 className="title">Indicator Report</h1>
    <h3 className="text">Enter the field you want to upload, view data or edit data:</h3>
  
    <div className="modalcampos">
      {<Campos/>} 
      </div>
      < ChangePass show={show} onClose={()=>setShow(false)} name={name_researcher}/>
    </>
  );
}

export default Inicio;