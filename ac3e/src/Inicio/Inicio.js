import "./Inicio.css";
import Campos from "./Components_Inicio/Campos";
import React from "react";

const Inicio=()=> {
  return (
    <>
    
    <div className='header'> 
      <img className="logo" src={"/ac3e.png"}/>
      <div className='usuario'>
        <h1 className="titulo1">Bienvenido/a Investigador(a) 1</h1>
      </div>
      <a className="statistics" href="https://app.powerbi.com/view?r=eyJrIjoiOGFhN2I3MzQtY2FlZS00YjQzLWIzNTktNTgwNDNmMWU1MTQxIiwidCI6IjAyNjI1Njc2LTMyMjctNDQwYS05YzY4LWJiNmQyOWRlNDIwNiIsImMiOjR9" target="_blank">Estadísticas</a>  
    </div>
    <h1 className="title">Reporte de indicadores</h1>
    <h3 className="text">Ingrese al campo el cual desea subir o visualizar datos:</h3>
  
    <div className="modalcampos">
      {<Campos/>} 
      </div>

    </>
  );
}

export default Inicio;