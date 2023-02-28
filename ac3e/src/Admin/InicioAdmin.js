import "./InicioAdmin.css";
import React from "react";
import Modal from "./ComponentsAdmin/Modal.js"

const InicioAdmin=()=> {

  return (
    <>
    
    <div className='header'> 
      <img className="logo" src={"/ac3e.png"}/>
      <div className='usuario'>
        <h1 className="titulo1">Welcome administrator </h1>
      </div>
      <a className="statistics" href="https://app.powerbi.com/view?r=eyJrIjoiOGFhN2I3MzQtY2FlZS00YjQzLWIzNTktNTgwNDNmMWU1MTQxIiwidCI6IjAyNjI1Njc2LTMyMjctNDQwYS05YzY4LWJiNmQyOWRlNDIwNiIsImMiOjR9" target="_blank">Statistics</a>  
    </div>
    <h1 className="title">Indicator Report</h1>
    
    <div className="modalcampos">
      {<Modal/>} 
      </div>

    </>
  );
}

export default InicioAdmin;