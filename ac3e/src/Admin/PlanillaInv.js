import "./PlanillaInv.css";
import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

const PlanillaInvestigadores=()=> {

    const [campo, setCampo] = useState("default");
    const [register, setRegister] = useState("default");
    const [filtroSelect, setFiltroSelect] = useState("hidden");
    const [inputText, setInputText] = useState("hidden");
    const [inputDate, setInputDate] = useState("hidden");
    const [search, setSearch] = useState("");


    const handleChange = (e) => {
        setCampo(e.target.value);
    }

    const handleRegisterChange = (e) => {
      setRegister(e.target.value)   
    }

    const filtroChange = (e) => {
      setRegister("default");
      if(filtroSelect==="hidden"){
          setFiltroSelect("visible");
          
      }
      else {
          setFiltroSelect("hidden");
      }
  }

  const optionChange = (e) => {
      if(filtroSelect==="visible"){
          if(e.target.value==="sending" || e.target.value==="date"){
              setInputDate("date");
              setInputText("hidden")
          }
          else if (e.target.value==="doi" || e.target.value==="autor" || e.target.value==="articulo"){
              setInputText("text");
              setInputDate("hidden")

          }
          else{setInputText("hidden");
              setInputDate("hidden")}
          
      }
  }

  return (
    <>
    
    <div className='header'> 
      <img className="logo" src={"/ac3e.png"}/>
      <div className='usuario'>
        <h1 className="titulo1">Sesión Administrador</h1>
      </div>
      <a className="statistics" href="https://app.powerbi.com/view?r=eyJrIjoiOGFhN2I3MzQtY2FlZS00YjQzLWIzNTktNTgwNDNmMWU1MTQxIiwidCI6IjAyNjI1Njc2LTMyMjctNDQwYS05YzY4LWJiNmQyOWRlNDIwNiIsImMiOjR9">Estadísticas</a>  
    </div>
    <h1 className="title">Reporte de indicadores</h1>
    <h3 className="text">Ingrese el investigador y el campo que desee ver:</h3>
    <div className="formulario2">
            <form onSubmit={ev => {ev.preventDefault()}} onChange={optionChange}>
            <div>
                <input type= "text" name="buscar" id="buscar" autoComplete="on" placeholder="Investigador(a)" ></input>

                <select name="selectcampo" id="selectcampo" defaultValue={campo} onChange={handleChange}>
                    <option value="default" disabled hidden>Seleccione Campo de Reporte</option>
                    <option value="A1">A1 Isi publications</option>
                    <option value="A2">A2 Non Isi Publications</option>
                    <option value="A3">A3 Books</option>
                    <option value="A4">A4 Awards</option>
                    <option value="A5">A5 Organization Scientific Events</option>
                    <option value="A6">A6 Participation in Scientific Events</option>
                    <option value="A7">A7 Collaborative Activities</option>
                    <option value="A7.1">A7.1 Conjoint Proyects</option>
                    <option value="A8">A8 Thesis Students</option>
                    <option value="A9">A9 Postdoctoral Fellows</option>
                    <option value="A10">A10 Outreach</option>
                    <option value="A11">A11 Patents</option>
                    <option value="A12">A12 Public-private Connections</option>
                    <option value="A13">A13 Tec. and Know. Transfer</option>
                    <option value="A14">A14 Funding Sources</option>
                </select>

                <label>Desea filtrar los datos?</label>
                <input type="checkbox" id="filtro" onChange={filtroChange}></input>
                
                
                <select name="selectbuscador" style={{visibility:filtroSelect}} id="selectbuscador" value={register} onChange={handleRegisterChange}>
                    <option value="default" disabled hidden>Seleccione opción de búsqueda</option>
                    <option value="doi">Digital Object Identifier (DOI)</option>
                    <option value="autor">Autor(s)</option>
                    <option value="articulo">Article Name</option>
                    <option value="date">Upload Day</option>
                </select>

                <input type= {inputText} name="buscar" id="buscar" autoComplete="off" onChange={ev => setSearch(ev.target.value)} ></input>
                <input type={inputDate} name="buscardate" id="buscardate" autoComplete="off"></input>
            
                <button type="submit">Buscar</button>
            </div>
            </form>    
        </div>

        <div><Link to="/PlanillaInv/EditarPerfil" className="botoneditar">Editar perfil</Link></div>

    </>
  );
}

export default PlanillaInvestigadores;