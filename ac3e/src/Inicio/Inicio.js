import "./Inicio.css";
import Campos from "./Components_Inicio/Campos.js";
import React from "react";

const Inicio=()=> {
  return (
    <>
    
    <div className='header'> 
      <img className="logo" src={"/ac3e.png"}/>
      <div className='usuario'>
        <h1 className="titulo1">Welcome researcher</h1>
      </div>
      <a className="statistics" href="https://app.powerbi.com/view?r=eyJrIjoiOGFhN2I3MzQtY2FlZS00YjQzLWIzNTktNTgwNDNmMWU1MTQxIiwidCI6IjAyNjI1Njc2LTMyMjctNDQwYS05YzY4LWJiNmQyOWRlNDIwNiIsImMiOjR9" target="_blank">Statistics</a>  
    </div>
    <h1 className="title">Indicator Report</h1>
    <h3 className="text">Enter the field you want to upload, view data or edit data:</h3>
  
    <div className="modalcampos">
      {<Campos/>} 
      </div>

    </>
  );
}

export default Inicio;