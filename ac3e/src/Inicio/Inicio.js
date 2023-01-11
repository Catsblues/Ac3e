import "./Inicio.css";
import Campos from "./Components_Inicio/Campos";

const Inicio=()=> {
  return (
    <>
    
    <div className='header'> 
      <img className="logo" src={"/ac3e.png"}/>
      <div className='usuario'>
        <h1>Bienvenido/a xxxxxx</h1>
      </div>
      <button className="statistics">Estadisticas</button>
    </div>
    <h1 className="title">Reporte de indicadores</h1>
    <h3 className="text">Eliga la opción e ingrese su reporte:</h3>

    <div className="modalcampos">
      {<Campos/>} 
      </div>

    </>
  );
}

export default Inicio;