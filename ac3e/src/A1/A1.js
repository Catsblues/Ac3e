import "./A1.css";
import React ,{useState}from "react";


const A1=()=> {

    const [register, setRegister] = useState("default");
    const [filtroSelect, setFiltroSelect] = useState("hidden");
    const [inputText, setInputText] = useState("hidden");
    const [search, setSearch] = useState("");
    const [check, setCheck] = useState(localStorage.getItem("check"));
    const [coautors, setCoautors] = useState("hidden");
    const [coautorss, setCosutorss] = useState("hidden");

    const handleRegisterChange = (e) => {
    
        setRegister(e.target.value)
        
    }

    const coautorChange = (e) => {
      if(coautors==="hidden"){
        setCoautors("text");
        setCosutorss("visible");
      }
      else{
        setCoautors("hidden");
        setCosutorss("hidden");
      }
    }

    const filtroChange = (e) => {
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
    }


  const writeJson = (newAutor, newCoautor, newTitulo, newJournal, newDoi, newVolume, newFirst, newLast, newYearPublished, newuploadDay) => {
    let newReport = {autor: newAutor, coautor: newCoautor,title: newTitulo, journal: newJournal, doi: newDoi, volume: newVolume, firstPage: newFirst , lastPage: newLast , yearPublished: newYearPublished, uploadDay: newuploadDay};
    var data = JSON.parse(localStorage.getItem("data"));
    if((data.find(reporte => reporte.journal === "no hay datos")) !== undefined){
      data=[];
    }
    data.push(newReport);

    localStorage.setItem("data",JSON.stringify(data));
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
      let newReport = {autor: "", title: "", journal: "no hay datos", doi: "", volume:"" , firstPage: "" , lastPage:""  , yearPublished:"" };
      newList.push(newReport);
    }
    localStorage.setItem("data",JSON.stringify(newList));
    window.location.reload();
    
  }

  const inicial = () => {
    if( (JSON.parse(localStorage.getItem("data"))) === null){
      let newReport = {autor: "", title: "", journal: "no hay datos", doi: "", volume:"" , firstPage: "" , lastPage:""  , yearPublished:"" };
      let lis = [];
      lis.push(newReport);
      localStorage.setItem("data",JSON.stringify(lis));
      localStorage.setItem("show",JSON.stringify(lis));
      }
    else{
      if(check === ""){
        var data = JSON.parse(localStorage.getItem("data"));
        localStorage.setItem("show", JSON.stringify(data));
      }
      
      else if(check !=="checked"){
        localStorage.setItem("check","");
        setCheck("");
        var data = JSON.parse(localStorage.getItem("data"));
        localStorage.setItem("show", JSON.stringify(data));
      }
      else{
        
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
    var data = JSON.parse(localStorage.getItem("data"));
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
        else{
            if(data[i].articulo===search){
                show.push(data[i])
            } 
        }
    }
    localStorage.setItem("show",JSON.stringify(show));
    window.location.reload();
  
    
}

 
  inicial();


    return (
      <>
      
      <div className='header'> 
        <img className="logo" src={"/ac3e.png"}/>
        <h1 className="titulo1">A1 Isi publications</h1>
        <a className="statistics" href="https://app.powerbi.com/view?r=eyJrIjoiOGFhN2I3MzQtY2FlZS00YjQzLWIzNTktNTgwNDNmMWU1MTQxIiwidCI6IjAyNjI1Njc2LTMyMjctNDQwYS05YzY4LWJiNmQyOWRlNDIwNiIsImMiOjR9">Estadísticas</a>
      </div>
      
      <h1 className="title">Ingreso de datos</h1>
      <h3 className="text">Si desea ingresar los datos favor rellene el formulario:</h3>
      
      <div className="formulario">
        <form onSubmit={ev => {
            ev.preventDefault();

            const autor = ev.target.autor.value;
            if(coautors === "text"){
            var coautor = ev.target.coautor.value;
            }
            else{
              var coautor = "";
            }
            
            const titulo = ev.target.titulo.value;
            const journal = ev.target.journal.value;
            const doi = ev.target.doi.value;
            const volumen = ev.target.volumen.value;
            const first = ev.target.first.value;
            const last = ev.target.last.value;
            const date = ev.target.date.value;
            const fecha = new Date();
            const añoActual = fecha.getFullYear();
            const mesActual = fecha.getMonth()+1;
            const uploadDay = {añoActual}+","+{mesActual};


            writeJson(autor, coautor, titulo, journal, doi, volumen, first,last,date,uploadDay);
            window.location.reload();
            }}>
          
          <span>
            
					  <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
            <input type="text" name="autor" id="autor" className="titulo" autoComplete="off" placeholder="Autor(s)"/>
            
            </label>
            <span className="item"><i class="fa-solid fa-circle-question">
            <p class="innerText">
                First name and last name.
                </p >
            </i>
                
              </span>
              
            </span>
            
            
            
            <label>¿Coautor de AC3E?</label>
            <span className="item" style={{visibility:coautorss}}><i class="fa-solid fa-circle-question">
            <div class="innerText">
            First name and last name.
              </div>
            </i>
              
            </span> 
            <label >
            <span style={{color:"red", marginRight:"5px", visibility:coautorss }}>
            *
          </span>
            <input type="checkbox" name="checkCoautor" id="checkCoautor" onChange={coautorChange}></input>
            </label>
            <input type={coautors} name="coautor" id="coautor" autoComplete="off" placeholder="Coauthor(s)"></input>
          
          <div>
          <label >
            <span style={{color:"red", marginRight:"5px" }}>
            *
          </span>
          <input type="text" name="titulo" id="titulo" className="titulo" style={{marginRight:"10px"}} autoComplete="off" placeholder="Article Title"/>
          </label>
          <label >
            <span style={{color:"red", marginRight:"5px" }}>
            *
          </span>
					  <input type="text" name="journal" id="journal" className="journal" style={{marginRight:"10px"}} autoComplete="off" placeholder="Journal Name"/>
            </label>
            <label >
            <span style={{color:"red", marginRight:"5px" }}>
            *
          </span>
            <input type="text" name="doi" id="doi" className="doi" autoComplete="off" placeholder="Digital Object Identifier (DOI)"/>
            </label>
            
          </div>
          <div>
          <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
					  <input type="text" name="volumen" id="volumen" className="volumen" autoComplete="off" placeholder="Volume"/> 
            </label>
            <input type="text" name="first" id="first" className="first" autoComplete="off" placeholder="First page"/> 
            <input type="text" name="last" id="last" className="last" style={{marginRight:"10px"}} autoComplete="off" placeholder="Last page"/>
            <label >
            <span style={{color:"red", marginRight:"5px" }}>
            *
          </span>
            <input type="text" name="publish" id="date" className="date" autoComplete="off" placeholder="Year Published"/>
            </label>
          </div>
          <div>
            <input type="text" name="comentario" className="comentario" autoComplete="off" placeholder="Comment"></input>
          </div>
				  
        
          <button type="submit" >Enviar</button>
        </form>
      </div>

      <h1 className="title">Visualización de datos</h1>
      <h3 className="text" >Seleccione su campo de búsqueda e ingrese el dato correspondiente:</h3>
        
      


            
        

        <div className="tabla" style={{ marginTop:"15px"}}> 
        <table className="table table-success table-striped rounded">
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
      
      JSON.parse(localStorage.getItem("show")).map((reporte) => {
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
  
  export default A1;