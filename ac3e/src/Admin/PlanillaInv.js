import "./PlanillaInv.css";
import EditarReporte from "./ComponentsAdmin/EditarReporte";
import modalA1 from "../A1/Modal";
import modalA8 from "../A8/Modal";
import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const PlanillaInv=()=> {

    const [campo, setCampo] = useState("default");
    const [register, setRegister] = useState("default");
    const [search, setSearch] = useState("");
    const [check, setCheck] = useState(localStorage.getItem("checkInv"));
    const [searchInv, setSearchInv] = useState("");
    const [reports, setReports] = useState([]);
    const [actualizar, setActualizar] = useState(false);
    const [showa1, setShowa1] = useState(false);
    const [showa8, setShowa8] = useState(false);
    const[selecteddata, setSelecteddata] = useState([]);


    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
      }
      else{
        const decodedToken = jwt_decode(token);
        if (decodedToken.rol !== "admin") {
          navigate("/inicio");
        }
      }
    }, []);

    

    useEffect(() => {
    
      const getReportsA1 = async () => {
        await fetch('http://20.151.235.246/api/a1')
        .then(res => res.json())
        .then(res => setReports(res))}
      const getReportsA1Inv = async () => {
        await fetch('http://20.151.235.246/api/a1researcher/' + searchInv, {method : 'GET', headers : {'Origin' : 'http://localhost:3000', 'origin' : 'http://localhost:3000'}})
        .then(res => res.json())
        .then(res => setReports(res))
        .then(res => console.log(res))}
      const getReportsA8 = async () => {
        await fetch('http://20.151.235.246/api/a8')
        .then(res => res.json())
        .then(res => setReports(res))}
      const getReportsA8Inv = async () => {
          await fetch('http://20.151.235.246/api/a8researcher/' + searchInv, {method : 'GET', headers : {'Origin' : 'http://localhost:3000', 'origin' : 'http://localhost:3000'}})
          .then(res => res.json())
          .then(res => setReports(res))
          .then(res => console.log(res))}
      if(searchInv === "" && campo === "A1"){
           getReportsA1();console.log("A1")}
      if(searchInv !== "" && campo === "A1"){
          getReportsA1Inv();console.log("A1Inv")}
      if(searchInv === "" && campo === "A8"){
            getReportsA8();console.log("A8")}
      if(searchInv !== "" && campo === "A8"){
            getReportsA8Inv();console.log("A8Inv")}
    setActualizar(false);
    }, [searchInv,actualizar,campo])


    const handleChange = (valor) => {
        setCampo(valor);    
    }

    let i_ = -1;
    if(campo === "A1"){
      var rep = reports.map((reporte,index) => {
        i_+=1;
        var id = reporte.id;
        var researcher = reporte.researcher;
        var doi = reporte.doi;
        var title = reporte.title;
        var author = reporte.autor;
        var journal = reporte.journal;
        var year = reporte.yearPublished;
        var complete = reporte.complete;
        return(
          <>
            <tr key={index}>
              <td>{researcher}</td>
              <td>{doi}</td>
              <td>{title}</td>
              <td>{author}</td>
              <td>{journal}</td>
              <td>{year}</td>
              <td>{complete}</td>
              <td key={index} className="botones">
                <button className="edit" onClick={(e)=>{setShowa1(true); setSelecteddata(reports[index]) }}><i class="fa-solid fa-pen-to-square"></i></button>
                <button className="delete" onClick={()=>{deletereport(id)}}><i class="fa-solid fa-trash"></i></button>
              </td>
            </tr>
            
              < modalA1 show={showa1}  data={selecteddata} post={index} onClose={()=>{setShowa1(false);setActualizar(true)}} />
          
          </>
        )
      }
      )
    }
    else if(campo === "A8"){
      var rep = reports.map((reporte,index) => {
        i_+=1;
        var id = reporte.id;
        var researcher = reporte.researcher;
        var status = reporte.thesis_status;
        var nomStu = reporte.name;
        var nomThe = reporte.title;
        var degr = reporte.academic_degree;
        var clas = reporte.borrador;
        if(degr === "0"){
          degr = "non-degree admitted";
        }
        if(status === "0"){
          status = "";
        }
        return(
          <>
            <tr key={index}>
              <td>{researcher}</td>
              <td>{status}</td>
              <td>{nomStu}</td>
              <td>{nomThe}</td>
              <td>{degr}</td>
              <td>{clas}</td>
              <td key={index} className="botones">
                <button className="edit" onClick={(e)=>{setShowa8(true); setSelecteddata(reports[index]);console.log("estoy en editado") }}><i class="fa-solid fa-pen-to-square"></i></button>
                <button className="delete" onClick={()=>{deletereport(id)}}><i class="fa-solid fa-trash"></i></button>
              </td>
            </tr>
            
              < modalA8 sshow={showa8}  data={selecteddata} post={index} onClose={()=>{setShowa8(false);setActualizar(true)}}/>
          
          </>
        )
      }
      )
    }

    const handletable = (valor) => {
      if(campo==="A1"){
        return(
          <table className="table table-success table-striped rounded">
  <thead>
    <tr>
      <th scope="col">Researcher</th>
      <th scope="col">DOI</th>
      <th scope="col">Title</th>
      <th scope="col">Authors</th>
      <th scope="col">Journal</th>
      <th scope="col">Year</th>
      <th scope="col">Save Type</th>
      <th scope="col"></th>

    </tr>
  </thead>
  <tbody>
    {
      rep
      
    }
  </tbody>
</table>
        )
      }
      else if(campo==="A8"){
        return(
          <table className="table table-success table-striped rounded">
  <thead>
    <tr>
      <th scope="col">Researcher</th>
      <th scope="col">Thesis Status</th>
      <th scope="col">Student Name</th>
      <th scope="col">Thesis Title</th>
      <th scope="col">Academic Degree</th>
      <th scope="col">Save Type</th>
      <th scope="col"></th>

    </tr>
  </thead>
  <tbody>
    {
      rep
      
    }
  </tbody>
</table> 
        )
    }
  }
    
       

      
 
    const deletereport = (id) => {

      if(window.confirm("Are you sure you want to delete this report?")){    
        const requestInit = {
        method:'DELETE'
        }
        fetch('http://20.151.235.246/api/a1/'+id, requestInit)
        .then(res => res.json())
        .then(res => console.log(res))
        .then(res => console.log('hola'))
        setActualizar(true);
      }
    }    
    
    
  

  

  





    return(

<>
    <div className='header'> 
      <img className="logo" src={"/ac3e.png"}/>
      <div className='usuario'>
        <h1 className="titulo1">Sesión Administrador </h1>
      </div>
      
      <a className="statistics" href="https://app.powerbi.com/view?r=eyJrIjoiOGFhN2I3MzQtY2FlZS00YjQzLWIzNTktNTgwNDNmMWU1MTQxIiwidCI6IjAyNjI1Njc2LTMyMjctNDQwYS05YzY4LWJiNmQyOWRlNDIwNiIsImMiOjR9" target="_blank">Stadistics</a>  
    </div>
    
    <h1 className="title">Planilla  de investigadores</h1>   
    <h3 className="text">Ingrese el investigador y los tipos de reporte que desee ver:</h3>
    <div className="buscador">
            <form onSubmit={ev => {ev.preventDefault()}}>
            <div>
            <select name="selectcampo" id="selectcampo" defaultValue={campo} onChange={e => handleChange(e.target.value)}>
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
                <input type="text" name="inv" id="inv" autoComplete="off" placeholder="Investigador(a)" onChange={ev => setSearchInv(ev.target.value)} ></input>
            </div>
            </form>    
        </div>

    <div className="tabla"> 
      {handletable(campo)} 
</div>
</>
    );

    
}

export default PlanillaInv;