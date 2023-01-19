import "./A1.css";
import React ,{useState}from "react";


const A1=()=> {

    const [register, setRegister] = useState("default");
    const [filtroSelect, setFiltroSelect] = useState("hidden");
    const [inputText, setInputText] = useState("hidden");
    const [search, setSearch] = useState("");
    const [check, setCheck] = useState(localStorage.getItem("check"));
    const [coautors, setCoautors] = useState("hidden");

    const handleRegisterChange = (e) => {
    
        setRegister(e.target.value)
        
    }

    const coautorChange = (e) => {
      if(coautors==="hidden"){
        setCoautors("text");
      }
      else{
        setCoautors("hidden");
      }
    }

    const filtroChange = (e) => {
        setRegister("default");
        console.log(check);
        if(check === ""){
          localStorage.setItem("check", "checked");
          setCheck("checked");
          console.log("entre a checked");
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


  const writeJson = (newAutor, newCoautor, newTitulo, newJournal, newDoi, newVolume, newFirst, newLast, newYearPublished) => {
    let newReport = {autor: newAutor, coautor: newCoautor,title: newTitulo, journal: newJournal, doi: newDoi, volume: newVolume, firstPage: newFirst , lastPage: newLast , yearPublished: newYearPublished};
    var data = JSON.parse(localStorage.getItem("data"));
    console.log(data);
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
      console.log("holi");
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
        console.log("hola");
        localStorage.setItem("check","");
        setCheck("");
        var data = JSON.parse(localStorage.getItem("data"));
        localStorage.setItem("show", JSON.stringify(data));
      }
      else{
        console.log("hol2");
        
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
    console.log("entre");
    var data = JSON.parse(localStorage.getItem("data"));
    let show = [];
    for(var i = 0; i < data.length; i++){
        if(register==="doi"){
          console.log("entre a doi");
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
    console.log("sali de busqueda");
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


            writeJson(autor, coautor, titulo, journal, doi, volumen, first,last,date);
            window.location.reload();
            }}>
          <div>
					  <input type="text" name="autor" id="autor" className="autor" autoComplete="off" placeholder="Autor(s)"/>
            <label>¿Hay algún coautor de AC3E?</label>
            <input type="checkbox" name="checkCoautor" id="checkCoautor" onChange={coautorChange}></input>
            <input type={coautors} name="coautor" id="coautor" placeholder="Coauthor(s)"></input>
          </div>
          <div>
          <input type="text" name="titulo" id="titulo" className="titulo" autoComplete="off" placeholder="Article Title"/>
					  <input type="text" name="journal" id="journal" className="journal" autoComplete="off" placeholder="Journal Name"/>
            <input type="text" name="doi" id="doi" className="doi" autoComplete="off" placeholder="Digital Object Identifier (DOI)"/>
          </div>
          <div>
					  <input type="text" name="volumen" id="volumen" className="volumen" autoComplete="off" placeholder="Volume"/>
            <input type="text" name="first" id="first" className="first" autoComplete="off" placeholder="First page"/>
            <input type="text" name="last" id="last" className="last" autoComplete="off" placeholder="Last page"/>
            <input type="text" name="publish" id="date" className="date" autoComplete="off" placeholder="Year Published"/>
          </div>
          <div>
            <input type="text" name="comentario" className="comentario" autoComplete="off" placeholder="Comment"></input>
          </div>
				  
        
          <button type="submit" >Enviar</button>
        </form>
      </div>

      <h1 className="title">Visualización de datos</h1>
      <h3 className="text">Seleccione su campo de búsqueda e ingrese el dato correspondiente:</h3>
        
      <div className="buscador">
            <form onSubmit={ev => {ev.preventDefault()}}>
            <div>
            <label>Desea filtrar los datos?</label>
            <input type="checkbox" id="filtro" checked={check} onChange={filtroChange}></input>
            

                
                <select name="selectbuscador" style={{visibility:filtroSelect}} id="selectbuscador" value={register} onChange={handleRegisterChange}>
                    <option value="default" disabled hidden>Seleccione opción de búsqueda</option>
                    <option value="doi">Digital Object Identifier (DOI)</option>
                    <option value="autor">Autor(s)</option>
                    <option value="articulo">Article Name</option>
                    <option value="date">Upload Day</option>
                </select>

                <input type= {inputText} name="buscar" id="buscar" autoComplete="off" onChange={ev => setSearch(ev.target.value)} ></input>
            
                <button type="submit" onClick={()=>{busqueda()}}>Buscar</button>
            </div>
            </form> 


            
        </div>

        <div className="tabla"> 
        <table className="table table-success table-striped rounded">
  <thead>
    <tr>
      <th scope="col">DOI</th>
      <th scope="col">Article Name</th>
      <th scope="col">Autor(s)</th>
      <th scope="col">Journal Name</th>
      <th scope="col">Year Published</th>
      <th scope="col">Upload day</th>
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
              <td>{reporte.uploadDay}</td>
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