import "./InvActivos.css";
import React ,{useState, useEffect}from "react";
import EditarPerfil from "./EditarPerfil.js";
import AddInv from "./AddInv.js";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";


const InvActivos=()=> {
  
  const [actualizar, setActualizar] = useState(false);
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState("default");
  const [textfilter, setTextfilter] = useState("hidden");
  const [sshow, setShow] = useState(false);
  const [reports, setReports] = useState(["no hay datos"]);
  const [selecteddata, setSelecteddata] = useState([]);
  const [showadd, setShowadd] = useState(false);

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
    
      const getReports = async () => {
        await fetch('http://20.151.235.246/api/investigadores')
        .then(res => res.json())
        .then(res => setReports(res))}
      const getReportsname = async () => {
        await fetch('http://20.151.235.246/api/name/'+search)
        .then(res => res.json())
        .then(res => setReports(res))}
      const getReportstype = async () => {
        await fetch('http://20.151.235.246/api/type/'+search)
        .then(res => res.json())
        .then(res => setReports(res))}
      const getReportsmail = async () => {
        await fetch('http://20.151.235.246/api/mail/'+search)
        .then(res => res.json())
        .then(res => setReports(res))}
      const getReportsline = async () => {
        await fetch('http://20.151.235.246/api/line/'+search)
        .then(res => res.json())
        .then(res => setReports(res))}
      const getReportsinstitution = async () => {
        await fetch('http://20.151.235.246/api/institution/'+search+'%')
        .then(res => res.json())
        .then(res => setReports(res))}
      if(filtro === "default"){
           getReports()}
      else if(filtro === "name"){
           getReportsname()}
      else if(filtro === "type"){
           getReportstype()}
      else if(filtro === "mail"){
           getReportsmail()}
      else if(filtro === "line"){
           getReportsline()}
      else{
           getReportsinstitution()}
    setActualizar(false);
    }, [search, filtro,actualizar])

  


    const filtroChange = (e) => {
      setFiltro(e.target.value);
      if(e.target.value === "default"){
        setTextfilter("hidden");
        setFiltro("default");
      }
      else{
        setTextfilter("visible");
      }
    }

  const deleteinv = (id,name) => {
    if(window.confirm("Are you sure you want to eliminate "+name+" from active investigators?")){
      const requestInit = {
      method:'DELETE'
      }
      fetch('http://20.151.235.246/api/investigadores/'+id, requestInit)
      .then(res => res.json())
      .then(res => console.log(res))
      .then(res => console.log('hola'))
      setActualizar(true);
    
  }
}
   let i_ = -1;


  var showreports = () => {
    var rep;
    if(reports===undefined){
      rep= <tr><td></td>
              <td></td>
              <td></td>
              <td>there are no data</td>
              <td></td>
              <td></td></tr>
      return rep;
    }
      else{
     rep = reports.map((reporte,index) => {
      console.log("pase por map");
      i_+=1;
      let id_ =reporte.id;
      let name =reporte.name;
      let type =reporte.type;
      let mail =reporte.mail;
      let line =reporte.line;
      let institution=reporte.institution;

      return(
        <>
          <tr key={index}>
            
            <td>{name}</td>
            <td>{type}</td>
            <td>{mail}</td>
            <td>{line}</td>
            <td>{institution}</td>
            <td key={index} className="botones">
              <button className="edit" onClick={(e)=>{setShow(true); setSelecteddata(reports[index])}}><i class="fa-solid fa-pen-to-square"></i></button>
              <button className="delete" onClick={()=>{deleteinv(id_, name)}}><i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
          
            < EditarPerfil sshow={sshow}  data={selecteddata} post={index} onClose={()=>{setShow(false);setActualizar(true)}}/>
        
        </>
      )
    }
    )
    return rep;
  }
  }

    return (
      <>
      
      <div className='header'> 
        <img className="logo" src={"/ac3e.png"}/>
        <a className="statistics" href="https://app.powerbi.com/view?r=eyJrIjoiOGFhN2I3MzQtY2FlZS00YjQzLWIzNTktNTgwNDNmMWU1MTQxIiwidCI6IjAyNjI1Njc2LTMyMjctNDQwYS05YzY4LWJiNmQyOWRlNDIwNiIsImMiOjR9" target="_blank">statistics</a>
        <button className="add" onClick={(e)=>{setShowadd(true)}}>+</button>
      </div>
      <h1 className="title">Display of list of researchers</h1>
      <div className="buscador">
            <form onSubmit={ev => {ev.preventDefault()}}>
            <div>
            <select name="selectbuscador" id="selectbuscador" value={filtro} onChange={ev => filtroChange(ev)}>
                    <option value="default">no data filtering</option>
                    <option value="name">Name</option>
                    <option value="type">Type</option>
                    <option value="mail">Mail</option>
                    <option value="line">Line</option>
                    <option value="institution">Institution</option>
            </select>
                <input type={textfilter} name="buscar" id="buscar" autoComplete="off" placeholder="filter" onChange={ev => setSearch(ev.target.value)} ></input>
            
            </div>
            </form>
        </div>
        
      
      
      <AddInv showadd={showadd} onClose={()=>{setShowadd(false);setActualizar(true)}}/>   

        <div className="tabla"> 
        <table className="table table-success table-striped rounded">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Type</th>
      <th scope="col">Mail</th>
      <th scope="col">Line</th>
      <th scope="col">Institution</th>
      <th scope="col"></th>

    </tr>
  </thead>
  <tbody>
    {
      showreports()
      
    }
  </tbody>
</table> 
</div>


      </>
    );
  }
  
  export default InvActivos;