import "./A1.css";
import React ,{useState, useEffect} from "react";
import { utils, write} from "xlsx";
import { saveAs } from "file-saver";
import Modal from "./Modal.js";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";


const A1=()=> {
  const [sshow, setShow] = useState(false);
  const[selecteddata, setSelecteddata] = useState([]);
    const [coauthors, setCoauthors] = useState("hidden");
    const [register, setRegister] = useState("default");
    const [filtroSelect, setFiltroSelect] = useState("hidden");
    const [inputText, setInputText] = useState("hidden");
    const [search, setSearch] = useState("");
    const [check, setCheck] = useState(localStorage.getItem("check"));
    const [coautors, setCoautors] = useState("hidden");
    const [coautorss, setCosutorss] = useState("hidden");
    const [actualizar, setActualizar] = useState(false);
    const [filtro, setFiltro] = useState("default");
    const [reports, setReports] = useState([]);
    const [searchDoi, setSearchDoi] = useState("");
    const [autordoi, setAutordoi] = useState("");
    const [titledoi, setTitledoi] = useState("");
    const [journaldoi, setJournaldoi] = useState("");
    const [yeardoi, setYeardoi] = useState("");
    const [volumedoi, setVolumedoi] = useState("");
    const [firstdoi, setFirstdoi] = useState("");
    const [lastdoi, setLastdoi] = useState("");
    const [resdoi, setResdoi] = useState([{
        Title:"", 
        Authors: [],
        FirstPage:"",
        LastPage:"",
        Journal:"",
        Volume:"",
        Year:""}]);

    const [namer, setNamer] = useState("");
    const navigate = useNavigate();
      
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
      }
      else{
        const decodedToken = jwt_decode(token);
        if (decodedToken.rol !== "user") {
          navigate("/inicioAdmin");
        }
        else{
          console.log(decodedToken.name);
          const re = decodedToken.name;
          console.log(re);
          setNamer(re);

        }
      }
    }, []);

    useEffect(() => {
      const fetches = async () => {
      const getReports = async () => {
        console.log(namer);
        await fetch('http://20.151.235.246/api/a1researcher/'+ namer, {method : 'GET', headers : {'Origin' : 'http://localhost:3000', 'origin' : 'http://localhost:3000'}})
        .then(res => res.json())
        .then(res => setReports(res))
      }
      const getReportsname = async () => {
        await fetch('http://20.151.235.246/api/a8name'+search)
        .then(res => res.json())
        .then(res => setReports(res))
      }
      const getReportstitle = async () => {
        await fetch('http://localhost:9000/api/a8title'+search)
        .then(res => res.json())
        .then(res => setReports(res))
      }
      const getReportsstatus = async () => {
        if(search === "progress"){
          await fetch('http://localhost:9000/api/a8status1')
          .then(res => res.json())
          .then(res => setReports(res))
        }
        else{
          await fetch('http://localhost:9000/api/a8status2')
          .then(res => res.json())
          .then(res => setReports(res))
        }
      }
      const getReportsacademic = async () => {

        await fetch('http://localhost:9000/api/a8degree'+search)
        .then(res => res.json())
        .then(res => setReports(res))
      }
      const getReportssave = async () => {
        await fetch('http://localhost:9000/api/a8save'+search)
        .then(res => res.json())
        .then(res => setReports(res))
      }
      await getReports();
      
    }
      fetches();
      setActualizar(false);
    }, [actualizar, filtro, search] )


  const searchofdoi = async (ev) => {
    const getForDOI = async() => {
      const DOI = ev.target.value;
      await fetch('http://20.151.235.246/wos/search?q='+ DOI)
      .then(res => {
        const data = res.json();
        console.log(data);
        return data
})
      .then(data => {
        console.log(data);
        if(!data){
          setResdoi([{
            Title:"", 
            Authors: [],
            FirstPage:"",
            LastPage:"",
            Journal:"",
            Volume:"",
            Year:""}]);
        }
        else{
          setResdoi(data);
          console.log(data.Year);
        }
      })

      }
  
    await getForDOI();

      
  }


    const exportData = () => {
      //json to excel
      const data = utils.json_to_sheet(reports);
      const excelData = utils.book_new();
      utils.book_append_sheet(excelData, data, "Reportes Isi Publications");

      const excelBuffer = write(excelData, {bookType: "xlsx", type: "array"});
      const data1 = new Blob([excelBuffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
      saveAs(data1, "Reportes a8.xlsx");

    }


    const coautorChange = (e) => {
      if(coauthors==="hidden"){
        setCoauthors("text");
      }
      else{
        setCoauthors("hidden");
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
  
 
    let i_ = -1;



    var rep = reports.map((reporte,index) => {
      i_+=1;
      var id = reporte.id;
      var doi = reporte.doi;
      var title = reporte.title;
      var author = reporte.autor;
      var journal = reporte.journal;
      var year = reporte.yearPublished;
      var complete = reporte.complete;
      return(
        <>
          <tr key={index}>
            
            <td>{doi}</td>
            <td>{title}</td>
            <td>{author}</td>
            <td>{journal}</td>
            <td>{year}</td>
            <td>{complete}</td>
            <td key={index} className="botones">
              <button className="edit" onClick={(e)=>{setShow(true); setSelecteddata(reports[index]) }}><i class="fa-solid fa-pen-to-square"></i></button>
              <button className="delete" onClick={()=>{deletereport(id)}}><i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
          
            < Modal sshow={sshow}  data={selecteddata} post={index} onClose={()=>{setShow(false);setActualizar(true)}} name={nameresearcher}/>
        
        </>
      )
    }
    )


    return (
      <>
      
      <div className='header'> 
        <img className="logo" src={"/ac3e.png"}/>
        <h1 className="titulo1">A1 Isi Publications</h1>
        <a className="statistics" href="https://app.powerbi.com/view?r=eyJrIjoiOGFhN2I3MzQtY2FlZS00YjQzLWIzNTktNTgwNDNmMWU1MTQxIiwidCI6IjAyNjI1Njc2LTMyMjctNDQwYS05YzY4LWJiNmQyOWRlNDIwNiIsImMiOjR9">Statistics</a>
      </div>
      
      <h1 className="title">Data Entry</h1>
      <h3 className="text">Please fill in the form to enter new reports.</h3>
      
      <div className="formulario">
      <form onSubmit={ev => {
            ev.preventDefault();
            const funccion = async () => {
            const author = ev.target.autor.value;
            if(coauthors === "text"){
                var coauthor = ev.target.coautor.value}
                else{
                  var coauthor = "";
                }
            
            const title = ev.target.title.value;
            const journal = ev.target.journal.value;
            const doi = ev.target.doi.value;
            const volume = ev.target.volumen.value;
            const first = ev.target.first.value;
            const last = ev.target.last.value;
            const date = ev.target.date.value;
            const comment = ev.target.comment.value;
            
            var erased;
            if(author==="" || title==="" || journal==="0" || doi===""|| volume==="0"|| date==="" || ( coauthors==="text" && coauthor==="")){
               erased = "erased";
               
            }
            else{
               erased = "saved";
               
            }
            let newReport = { researcher: nameresearcher, autor:author, coauthor:coauthor, title:title, journal:journal, doi:doi, volume:volume, firstpage:first, lastpage:last, yearPublished:date, comment:comment, complete:erased}  
            const requestInit = {
              method:'POST',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify(newReport)
            }
            await fetch('http://20.151.235.246/api/a1', requestInit)
            .then(res => res.json())
            .then(res => console.log(res))
            .then(res => console.log('hola'))
          }
          funccion();
          setActualizar(true);
          window.location.reload();
            }}>
          
          <span>
          <label >
            <span style={{color:"red", marginRight:"5px" }}>
            *
          </span>
            <input type="text" name="doi" id="doi" className="doi" autoComplete="off" placeholder="Digital Object Identifier (DOI)" onChange={ev=>{searchofdoi(ev)}}/>
            </label>
            
					  <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
            <input type="text" name="autor" id="autor" className="titulo" autoComplete="off" placeholder="Autor(s)" defaultValue={resdoi.Authors}/>
            
            </label>
            <span className="item"><i class="fa-solid fa-circle-question">
            <p class="innerText">Format: Last Name, First name initial. (e.j., Perez, J.).
                </p >
            </i>
                
              </span>
              
            </span>
            
            
            
            <label>Any co-authors of Ac3e?</label>
            <span className="item" style={{visibility:coauthors}}><i class="fa-solid fa-circle-question">
            <div class="innerText">
            Format: Last Name, First name initial. (e.j., Perez, J.).
              </div>
            </i>
              
            </span> 
            <label >
            <span style={{color:"red", marginRight:"5px", visibility:coauthors}}>
            *
          </span>
            <input type="checkbox" name="checkCoautor" id="checkCoautor" onChange={coautorChange}></input>
            </label>
            <input type={coauthors} name="coautor" id="coautor" autoComplete="off" placeholder="Coauthor(s)"></input>
          
          <div>
          <label >
            <span style={{color:"red", marginRight:"5px" }}>
            *
          </span>
          <input type="text" name="title" id="title" className="titulo" style={{marginRight:"10px"}} autoComplete="off" placeholder="Article Title" defaultValue={resdoi.Title}/>
          </label>
          <label >
            <span style={{color:"red", marginRight:"5px" }}>
            *
          </span>
					  <input type="text" name="journal" id="journal" className="journal" style={{marginRight:"10px"}} autoComplete="off" placeholder="Journal Name" defaultValue={resdoi.Journal}/>
            </label>
            
            
          </div>
          <div>
          <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
					  <input type="text" name="volumen" id="volumen" className="volumen" autoComplete="off" placeholder="Volume" defaultValue={resdoi.Volume}/> 
            </label>
            <input type="text" name="first" id="first" className="first" autoComplete="off" placeholder="First page" defaultValue={resdoi.FirstPage}/> 
            <input type="text" name="last" id="last" className="last" style={{marginRight:"10px"}} autoComplete="off" placeholder="Last page" defaultValue={resdoi.LastPage} />
            <label >
            <span style={{color:"red", marginRight:"5px" }}>
            *
          </span>
            <input type="text" name="publish" id="date" className="date" autoComplete="off" placeholder="Year Published" defaultValue={resdoi.Year}/>
            </label>
          </div>
          <div>
            <input type="text" name="comment" className="comentario" autoComplete="off" placeholder="Comment"></input>
          </div>
				  
        
          <button type="submit" >Submit</button>
        </form>
      </div>

      <h1 className="title">Visualization and Editing of data</h1>
      <h3 className="text">Here you will see the data already saved and if you want you can edit or delete them.</h3>

      
      <button classname="exports" onClick={()=>{exportData()}}> Export data</button>  

        <div className="tabla"> 
        <table className="table table-success table-striped rounded">
  <thead>
    <tr>
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
</div>


      </>
    );
  }
  
  export default A1;
