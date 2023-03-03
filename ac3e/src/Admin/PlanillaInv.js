import "./PlanillaInv.css";
import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const PlanillaInv=()=> {

    const [campo, setCampo] = useState(localStorage.getItem("campo"));
    const [register, setRegister] = useState("default");
    const [filtroSelect, setFiltroSelect] = useState("hidden");
    const [inputText, setInputText] = useState("hidden");
    const [search, setSearch] = useState("");
    const [check, setCheck] = useState(localStorage.getItem("checkInv"));
    const [searchInv, setSearchInv] = useState(localStorage.getItem("Investigador"));

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

    const printInv = () => {
        var data = JSON.parse(localStorage.getItem("data"));
        if(data !== null){
            if(searchInv === "Zañartu, M"){
                localStorage.setItem("showInv",JSON.stringify(data));
            }
            else if(searchInv === null){
              
              let newReport = {autor: "", coautor:"",title: "", journal: "no hay datos", doi: "", volume:"" , firstPage: "" , lastPage:""  , yearPublished:"" };
              let lis = [];
              lis.push(newReport);
              localStorage.setItem("showInv",JSON.stringify(lis));
                
                
            }
            else{
                let newList = data;
                var report = data.find(reporte => reporte.coautor === searchInv);
                if(report==undefined){
                  let newReport = {autor: "", coautor: "",title: "", journal: "no hay datos", doi: "", volume:"" , firstPage: "" , lastPage:""  , yearPublished:"" };
                  let lis = [];
                  lis.push(newReport);
                  localStorage.setItem("showInv",JSON.stringify(lis));
                }
                else{
                  
                  var final = new Array();
                  
                  while(report!=undefined){
                    
                    final.push(report);
                    
                    let auxiliarList= [];
                    for(var i = 0; i < newList.length; i++){
                      if(compare(report, newList[i]) === false){
                        auxiliarList.push(newList[i]);
                       
                      }
                    }
                    newList=auxiliarList;
                    report = newList.find(reporte => reporte.coautor === searchInv);
                    

                  }
                  
                  localStorage.setItem("showInv", JSON.stringify(final));
                }


                
            }
        }
        
    }

    const handleChange = (valor) => {
        setCampo(valor);
        if(valor === "A1"){
          localStorage.setItem("campo","A1");
          localStorage.setItem("showInv",(localStorage.getItem("data")));
          setTimeout(()=>{
            window.location.reload(true);
          });
          
        }
        else{
          let newReport = {autor: "", conautor: "",title: "", journal: "no hay datos", doi: "", volume:"" , firstPage: "" , lastPage:""  , yearPublished:"" };
          let lis = [];
          lis.push(newReport);
          localStorage.setItem("showInv",JSON.stringify(lis));
        }
    }

    const handleRegisterChange = (e) => {
    
        setRegister(e.target.value)
        
    }

    const filtroChange = (e) => {
      setRegister("default");
      if(check === ""){
        localStorage.setItem("checkInv", "checked");
        setCheck("checked");
        setFiltroSelect("visible");
        setInputText("text");   
      }
      else {
          setFiltroSelect("hidden");
          localStorage.setItem("checkInv", "");
          setCheck("");
          var data = JSON.parse(localStorage.getItem("data"));
          localStorage.setItem("showInv", JSON.stringify(data));
          localStorage.setItem("checkInv", "")
          setTimeout(()=>{
            window.location.reload(true);
          });

      }
  }


  const deleteJson = (reporte) => {
    var data = JSON.parse(localStorage.getItem("data"));
    let newList = [];
    for(var i = 0; i < data.length; i++){
      if(compare(reporte, data[i]) === false){
        newList.push(data[i]);
      }
    }
    localStorage.clear();
    if(newList.length === 0){
      let newReport = {autor: "", coautor:"",title: "", journal: "no hay datos", doi: "", volume:"" , firstPage: "" , lastPage:""  , yearPublished:"" };
      newList.push(newReport);
    }
    localStorage.setItem("data",JSON.stringify(newList));
    setTimeout(()=>{
      window.location.reload(true);
    });
    
  }

  const inicial = () => {
    if((localStorage.getItem("data")) == undefined){
      let newReport = {autor: "", coautor: "",title: "", journal: "no hay datos", doi: "", volume:"" , firstPage: "" , lastPage:""  , yearPublished:"" };
      let lis = [];
      lis.push(newReport);
      localStorage.setItem("data",JSON.stringify(lis));
      localStorage.setItem("showInv",JSON.stringify(lis));
      }
    else{
      
      if(check === ""){
        if(campo !== "A1"){
          let newReport = {autor: "", coautor: "",title: "", journal: "no hay datos", doi: "", volume:"" , firstPage: "" , lastPage:""  , yearPublished:"" };
          let lis = [];
          lis.push(newReport);
          localStorage.setItem("showInv",JSON.stringify(lis));
          localStorage.setItem("campo","default");
        }
        else{
          if(searchInv!==""){
            printInv();
          }
          else{
            let newReport = {autor: "", coautor:"",title: "", journal: "no hay datos", doi: "", volume:"" , firstPage: "" , lastPage:""  , yearPublished:"" };
            let lis = [];
            lis.push(newReport);
            localStorage.setItem("showInv",JSON.stringify(lis));
          }
        }
      }
      
      else if(check !=="checked"){
        
        localStorage.setItem("checkInv","");
        setCheck("");
        let newReport = {autor: "", coautor:"",title: "", journal: "no hay datos", doi: "", volume:"" , firstPage: "" , lastPage:""  , yearPublished:"" };
        let lis = [];
        lis.push(newReport);
        localStorage.setItem("showInv",JSON.stringify(lis));
      }
      
      
    }
    
    
  }

  const compare = (reportA, reportB) => {
    
    var Akeys = Object.keys(reportA);
    var Bkeys = Object.keys(reportB);

    if(Akeys.join("") !== Bkeys.join("")){
      return false;
    }
    for(var i = 0; i < Akeys.length; i++){
      if(reportA[Akeys[i]] !== reportB[Bkeys[i]]){
        return false;
      }
    }
    
    return true;
  }

  const busqueda = (e) =>{ 
    printInv();
    var data = JSON.parse(localStorage.getItem("showInv"));
    let show = [];
    for(var i = 0; i < data.length; i++){
        if(register==="doi"){
            if(data[i].doi===search){
                show.push(data[i])
            }
        }
        else if(register==="autor"){
            if(data[i].autor===search){
                show.push(data[i])
            }
        }
        else if(register==="articulo"){
            if(data[i].title===search){
                show.push(data[i])
            } 
        }
        
    }
    
    localStorage.setItem("showInv",JSON.stringify(show));
    setTimeout(()=>{
      window.location.reload(true);
    });
  
    
}


  inicial();

    


    return(

<>
    <div className='header'> 
      <img className="logo" src={"/ac3e.png"}/>
      <div className='usuario'>
        <h1 className="titulo1">Sesión Administrador </h1>
      </div>
      
      <a className="statistics" href="https://app.powerbi.com/view?r=eyJrIjoiOGFhN2I3MzQtY2FlZS00YjQzLWIzNTktNTgwNDNmMWU1MTQxIiwidCI6IjAyNjI1Njc2LTMyMjctNDQwYS05YzY4LWJiNmQyOWRlNDIwNiIsImMiOjR9" target="_blank">Stadistics</a>  
    </div>
    
    <h1 className="title">Planilla personal de investigadores</h1>   
    <h3 className="text">Ingrese el investigador y los tipos de reporte que desee ver:</h3>
    <div className="buscador">
            <form onSubmit={ev => {ev.preventDefault()}}>
            <div>

                <input type="text" name="inv" id="inv" autoComplete="off" placeholder="Investigador(a)" onChange={ev => setSearchInv(ev.target.value)} ></input>
                
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

                <label>Desea filtrar los datos?</label>
            <input type="checkbox" id="filtro" checked={check} onChange={filtroChange}></input>
                
                
                <select name="selectbuscador" style={{visibility:filtroSelect}} id="selectbuscador" value={register} onChange={handleRegisterChange}>
                    <option value="default" disabled hidden>Seleccione opción de búsqueda</option>
                    <option value="doi">Digital Object Identifier (DOI)</option>
                    <option value="autor">Autor(s)</option>
                    <option value="articulo">Article Name</option>
                </select>

                <input type= {inputText} name="buscar" id="buscar" autoComplete="off" onChange={ev => setSearch(ev.target.value)} ></input>
               
                <button type="submit" onClick={()=>{busqueda()}}>Buscar</button>
            </div>
            </form>    
        </div>

    <div className="tabla"> 
    <table className="table table-success table-striped">
<thead>
<tr>
  <th scope="col">DOI</th>
  <th scope="col">Article Name</th>
  <th scope="col">Autor(s)</th>
  <th scope="col">Journal Name</th>
  <th scope="col">Year Published</th>
  <th scope="col"></th>

</tr>
</thead>
<tbody>
{
      
      JSON.parse(localStorage.getItem("showInv")).map((reporte) => {
        return(
          <>
            <tr>
              <th scope="row">{reporte.doi}</th>
              <td>{reporte.title}</td>
              <td>{reporte.autor}</td>
              <td>{reporte.journal}</td>
              <td>{reporte.yearPublished}</td>
              <div className="botones">
                <button className="edit"><i class="fa-solid fa-pen-to-square"></i></button>
                <button className="delete" onClick={()=>{deleteJson(reporte)}}><i class="fa-solid fa-trash"></i></button>
              </div>
            </tr>
          </>
        )
      }
      )
    }


</tbody>
</table> 
</div>
</>
    );

    
}

export default PlanillaInv;