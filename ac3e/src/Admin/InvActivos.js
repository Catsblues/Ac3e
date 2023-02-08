import "./InvActivos.css";
import React ,{useState, useEffect}from "react";
import EditarPerfil from "./EditarPerfil";
import AddInv from "./AddInv";


const InvActivos=()=> {

  
    
    const [search, setSearch] = useState("");
    const [filtro, setFiltro] = useState("default");
    const [textfilter, setTextfilter] = useState("hidden");
    const [sshow, setShow] = useState(false);
    const [reports, setReports] = useState(["no hay datos"]);
    const[selecteddata, setSelecteddata] = useState([]);
    const [showadd, setShowadd] = useState(false);
    
    useEffect(() => {
      console.log("pase por aqui");
      const fetches = async () => {
        console.log("pase por acuya");
        const getReports = async () => {
          console.log("llegue a principal");
          await fetch('http://localhost:9000/api/investigadores')
          .then(res => res.json())
          .then(res => setReports(res))
          console.log(reports);
        }
        const getReportsname = async () => {
          await fetch('http://localhost:9000/api/name/'+search)
          .then(res => res.json())
          .then(res => setReports(res))
        }
        const getReportsmail = async () => {
          await fetch('http://localhost:9000/api/mail/'+search)
          .then(res => res.json())
          .then(res => setReports(res))
        }
        const getReportsline = async () => {
          await fetch('http://localhost:9000/api/line/'+search)
          .then(res => res.json())
          .then(res => setReports(res)); 
        }
        const getReportsinstitution = async () => {
          await fetch('http://localhost:9000/api/institution/'+search)
          .then(res => res.json())
          .then(res => setReports(res))
        }
        if(filtro === "default"){
          await getReports();
        console.log(reports)}
        else if(filtro === "name"){
          await getReportsname()}
        else if(filtro === "mail"){
          await getReportsmail()}
        else if(filtro === "line"){
          await getReportsline()}
        else{
          await getReportsinstitution()}
        console.log(reports);
    }
    fetches();
    console.log("sali de aqui");
    }, [search, filtro])

  


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
    if(window.confirm("¿Está seguro(a) que desea eliminar a "+name+" de investigadores activos?")){
      const requestInit = {
      method:'DELETE'
      }
      fetch('http://localhost:9000/api/investigadores/'+id, requestInit)
      .then(res => res.json())
      .then(res => console.log(res))
      .then(res => console.log('hola'))
      window.location.reload();
    
  }
}
   let i_ = -1;


  var showreports = () => {
    var rep;
    if(reports===undefined){
      rep= <tr><td></td>
              <td>No hay datos</td>
              <td></td>
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
      let mail =reporte.mail;
      let line =reporte.line;
      let institution=reporte.institution;

      return(
        <>
          <tr key={index}>
            
            <td>{name}</td>
            <td>{mail}</td>
            <td>{line}</td>
            <td>{institution}</td>
            <td key={index} className="botones">
              <button className="edit" onClick={(e)=>{setShow(true); setSelecteddata(reports[index]) }}><i class="fa-solid fa-pen-to-square"></i></button>
              <button className="delete" onClick={()=>{deleteinv(id_, name)}}><i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
          
            < EditarPerfil sshow={sshow}  data={selecteddata} post={index} onClose={()=>setShow(false)}/>
        
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
        <a className="statistics" href="https://app.powerbi.com/view?r=eyJrIjoiOGFhN2I3MzQtY2FlZS00YjQzLWIzNTktNTgwNDNmMWU1MTQxIiwidCI6IjAyNjI1Njc2LTMyMjctNDQwYS05YzY4LWJiNmQyOWRlNDIwNiIsImMiOjR9">Estadísticas</a>
        <button className="add" onClick={(e)=>{setShowadd(true)}}>+</button>
      </div>
      <h1 className="title">Visualización de Investigadores</h1>
      <div className="buscador">
            <form onSubmit={ev => {ev.preventDefault()}}>
            <div>
            <select name="selectbuscador" id="selectbuscador" value={filtro} onChange={ev => filtroChange(ev)}>
                    <option value="default">no data filtering</option>
                    <option value="name">Name</option>
                    <option value="mail">Mail</option>
                    <option value="line">Line</option>
                    <option value="institution">Institution</option>
            </select>
                <input type={textfilter} name="buscar" id="buscar" autoComplete="off" placeholder="filter" onChange={ev => setSearch(ev.target.value)} ></input>
            
            </div>
            </form>
        </div>
        
      
      
      <AddInv showadd={showadd} onClose={()=>setShowadd(false)}/>   

        <div className="tabla"> 
        <table className="table table-success table-striped rounded">
  <thead>
    <tr>
      <th scope="col">Name</th>
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