import "./A1.css";
import Buscador from "./Buscador";
import datos from "./datos";
import React from "react";


const A1=()=> {


  var actualData = localStorage.getItem("data");
  actualData = JSON.parse(actualData);
  console.log(actualData);


  const writeJson = (newAutor, newTitulo, newJournal, newDoi, newVolume, newFirst, newLast, newYearPublished) =>{
    
    let newReport = {autor: newAutor, title: newTitulo, journal: newJournal, doi: newDoi, volume: newVolume, firstPage: newFirst , lastPage: newLast , yearPublished: newYearPublished};
    var data = localStorage.getItem("data");
    data = JSON.parse(data);
    if(data!==null){
      data.push(newReport);
      }
    else{
      let data1 = [];
      data1.push(newReport);
      data=data1;
    }
    localStorage.setItem("data",JSON.stringify(data));
    }




    return (
      <>
      
      <div className='header'> 
        <img className="logo" src={"/ac3e.png"}/>
        <h1 className="titulo1">A1 Isi publications</h1>
        <a className="statistics" href="https://app.powerbi.com/view?r=eyJrIjoiOGFhN2I3MzQtY2FlZS00YjQzLWIzNTktNTgwNDNmMWU1MTQxIiwidCI6IjAyNjI1Njc2LTMyMjctNDQwYS05YzY4LWJiNmQyOWRlNDIwNiIsImMiOjR9">Estadisticas</a>
      </div>
      
      <h1 className="title">Ingreso de datos</h1>
      <h3 className="text">Si desea ingresar los datos favor rellene el formulario:</h3>
      
      <div className="formulario">
        <form onSubmit={ev => {
            ev.preventDefault();
            const autor = ev.target.autor.value;
            const titulo = ev.target.titulo.value;
            const journal = ev.target.journal.value;
            const doi = ev.target.doi.value;
            const volumen = ev.target.volumen.value;
            const first = ev.target.first.value;
            const last = ev.target.last.value;
            const date = ev.target.date.value;


            writeJson(autor, titulo, journal, doi, volumen, first,last,date);

            }}>
          <div>
					  <input type="text" name="autor" id="autor" className="autor" autoComplete="off" placeholder="Autor(s)"/>
        
					  <input type="text" name="titulo" id="titulo" className="titulo" autoComplete="off" placeholder="Article Title"/>
          </div>
          <div>
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
        {<Buscador/>}
        {<datos c={1}/>}

        <div className="tabla"> 
        <table className="table table-success table-striped">
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
      JSON.parse(localStorage.getItem("data")).map((reporte) => {
        return(
          <>
            <tr>
              <th scope="row">{reporte.doi}</th>
              <td>{reporte.title}</td>
              <td>{reporte.autor}</td>
              <td>{reporte.journal}</td>
              <td>{reporte.yearPublished}</td>
              <td>{reporte.uploadDay}</td>
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