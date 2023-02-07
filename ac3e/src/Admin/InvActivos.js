import "./InvActivos.css";
import React ,{useState, useEffect}from "react";
import EditarPerfil from "./EditarPerfil";
import AddInv from "./AddInv";


const InvActivos=()=> {

  
    
    const [search, setSearch] = useState("");
    const [check, setCheck] = useState(localStorage.getItem("check"));
    const [filtro, setFiltro] = useState("default");

    const [sshow, setShow] = useState(false);

    const [reports, setReports] = useState([]);
    
    const[selecteddata, setSelecteddata] = useState([]);
    const [showadd, setShowadd] = useState(false);
    

    useEffect(() => {
      const getReports = () => {
        fetch('http://localhost:9000/api/investigadores')
        .then(res => res.json())
        .then(res => setReports(res))
      }
      getReports()
    }, [] )

  

    



   
   

    /*const filtroChange = (e) => {
        setRegister("default");
        if(check === ""){
          localStorage.setItem("check", "checked");
          setCheck("checked");
          setFiltroSelect("visible");
          setInputText("text");

   
        }
        else {
            setFiltroSelect("hidden");
            localStorage.setItem("check", "");
            setCheck("");
            var data = JSON.parse(localStorage.getItem("data"));
            localStorage.setItem("show", JSON.stringify(data));
            localStorage.setItem("check", "")
            window.location.reload();

        }
    }*/


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



    var rep = reports.map((reporte,index) => {
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

    return (
      <>
      
      <div className='header'> 
        <img className="logo" src={"/ac3e.png"}/>
        <a className="statistics" href="https://app.powerbi.com/view?r=eyJrIjoiOGFhN2I3MzQtY2FlZS00YjQzLWIzNTktNTgwNDNmMWU1MTQxIiwidCI6IjAyNjI1Njc2LTMyMjctNDQwYS05YzY4LWJiNmQyOWRlNDIwNiIsImMiOjR9">Estadísticas</a>
      </div>
      <h1 className="title">Visualización de Investigadores</h1>
      <div className="buscador">
            <form onSubmit={ev => {ev.preventDefault()}}>
            <div>
            <select name="selectbuscador" id="selectbuscador" value={filtro} >
                    <option value="default" disabled hidden>no data filtering</option>
                    <option value="status">Name</option>
                    <option value="student">Mail</option>
                    <option value="thesis">Line</option>
                    <option value="degree">Institution</option>
                    
                </select>
                
              

                <input type="text" name="buscar" id="buscar" autoComplete="off" onChange={ev => setSearch(ev.target.value)} ></input>
            
                <button type="submit" onClick={()=>{}}>Buscar</button>
            </div>
            </form> 


            
        </div>
      <button className="add" onClick={(e)=>{setShowadd(true)}}>+</button>
      
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
      rep
      
    }
  </tbody>
</table> 
</div>


      </>
    );
  }
  
  export default InvActivos;