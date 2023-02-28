import "./A8.css";
import React ,{useState, useEffect} from "react";
import { utils, write} from "xlsx";
import { saveAs } from "file-saver";
import Modal from "./Modal.js";



const A8=()=> {

    const [actualizar, setActualizar] = useState(false);
    const [filtro, setFiltro] = useState("default");
    const [textfilter, setTextfilter] = useState("hidden");
    const [statusfilter, setStatusfilter] = useState("hidden");
    const [academicfilter, setAcademicfilter] = useState("hidden");
    const [savefilter, setSavefilter] = useState("hidden");
    const [gender, setGender] = useState("0");
    const [thesisStatus, setThesisStatus] = useState("0");
    const [academic, setAcademic] = useState("0");
    const [posterior, setPosterior] = useState("0");
    const [register, setRegister] = useState("0");
    const [posteriorSelect, setPosteriorSelect] = useState("hidden");
    const [filtroSelect, setFiltroSelect] = useState("hidden");
    const [search, setSearch] = useState("");
    const [check, setCheck] = useState(localStorage.getItem("check"));
    const [coautors, setCoautors] = useState("hidden");
    const [others, setOthers] = useState("hidden");
    const [archivo, setArchivo] = useState("hidden");
    const [ins, setIns] = useState("hidden");
    const [Equipment, setEquipment] = useState("false");
    const [Information, setInformation] = useState("false");
    const [Infraestructure, setInfraestructure] = useState("false");
    const [Othercheck, setOthercheck] = useState("false");
    const [sshow, setShow] = useState(false);
    const [archivosave , setArchivosave] =useState(null);
    const [reports, setReports] = useState([]);
    const[selecteddata, setSelecteddata] = useState([]);
    const [filtrostatus, setFiltrostatus] = useState("default");
    const [filtroacademic, setFiltroacademic] = useState("default");
    const [filtrosave, setFiltrosave] = useState("default");

    

    useEffect(() => {
      const fetches = async () => {
      const getReports = async () => {
        await fetch('http://20.151.235.246/api/a8', {method : 'GET', headers : {'Origin' : 'http://localhost:3000', 'origin' : 'http://localhost:3000'}})
        .then(res => res.json())
        .then(res => setReports(res))
      }
      const getReportsname = async () => {
        await fetch('http://localhost:9000/api/a8name'+search)
        .then(res => res.json())
        .then(res => setReports(res))
      }
      const getReportstitle = async () => {
        await fetch('http://localhost:9000/api/a8title'+search)
        .then(res => res.json())
        .then(res => setReports(res))
      }
      const getReportsstatus = async () => {
        await fetch('http://localhost:9000/api/a8thesisStatus'+search)
        .then(res => res.json())
        .then(res => setReports(res))
      }
      const getReportsacademic = async () => {

        await fetch('http://localhost:9000/api/a8academicDegree'+search)
        .then(res => res.json())
        .then(res => setReports(res))
      }
      const getReportssave = async () => {
        await fetch('http://localhost:9000/api/a8save'+search)
        .then(res => res.json())
        .then(res => setReports(res))
      }
      if(filtro === "default"){
        await getReports();
      }
      else if(filtro === "name"){
        await getReportsname();
      }
      else if(filtro === "status"){
        await getReportsstatus();
      }
      else if(filtro === "degree"){
        await getReportsacademic();
      }
      else if(filtro === "title"){
        await getReportstitle();
      }
      else{
        await getReportssave();
      }
    }
      fetches();
      setActualizar(false);
    }, [actualizar, filtro, search] )


    const  fileHandler = (e) => {
      setArchivosave(e.target.files[0])
    }

    const handleGenderChange = (e) => {
      console.log(e.target.value);
      setGender(e.target.value)
        
    }

    const exportData = () => {
      //json to excel
      const data = utils.json_to_sheet(reports);
      const excelData = utils.book_new();
      utils.book_append_sheet(excelData, data, "Reportes a8");

      const excelBuffer = write(excelData, {bookType: "xlsx", type: "array"});
      const data1 = new Blob([excelBuffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
      saveAs(data1, "Reportes a8.xlsx");

    }

    const filtroChange = (e) => {
      setFiltro(e.target.value);
      if(e.target.value === "default"){
        setTextfilter("hidden");
        setStatusfilter("hidden");
        setAcademicfilter("hidden");
        setSavefilter("hidden");
        setFiltro("default");
      }
      else if(e.target.value === "status"){
        setTextfilter("hidden");
        setStatusfilter("visible");
        setAcademicfilter("hidden");
        setSavefilter("hidden");
        setFiltro("status");
      }
      else if(e.target.value === "save"){
        setTextfilter("hidden");
        setStatusfilter("hidden");
        setAcademicfilter("hidden");
        setSavefilter("visible");
        setFiltro("save");
      }
      else if(e.target.value === "degree"){
        setTextfilter("hidden");
        setStatusfilter("hidden");
        setAcademicfilter("visible");
        setSavefilter("hidden");
        setFiltro("degree");
      }
      else{
        setTextfilter("visible");
        setStatusfilter("hidden");
        setAcademicfilter("hidden");
        setSavefilter("hidden");
        if(e.target.value === "name"){
          setFiltro("name");
        }
        else{
          setFiltro("title");
        }
      }
    }

    const thesisstatusChange = (e) => {
      
      
    }

    const handleStatusChange = (e) => {
    
      setThesisStatus(e.target.value)
      if(e.target.value==="Finished"){
        setArchivo("file");
        setPosteriorSelect("visible");
        setIns("text");
      }
      else{
        setArchivo("hidden");
        setPosteriorSelect("hidden");
        setIns("hidden");
      }
      
  }

  const handleAcademicChange = (e) => {
    
    setAcademic(e.target.value)
    
}



const handlePosteriorChange = (e) => {
    
  setPosterior(e.target.value)
  
}

    const coautorChange = (e) => {
      if(coautors==="hidden"){
        setCoautors("text");
      }
      else{
        setCoautors("hidden");
      }
    }

    const otherChange = (e) => {
      if(others==="hidden"){
        setOthers("text");
      }
      else{
        setOthers("hidden");
      }
    }

    const equipmentChange = (e) => {
      if(Equipment===""){
        setEquipment("equipment");
      }
      else{
        setEquipment("");
      }
    }

    const informationChange = (e) => {
      if(Information===""){
        setInformation("information");
      }
      else{
        setInformation("");
      }
    }

    const infraestructureChange = (e) => {
      if(Infraestructure===""){
        setInfraestructure("infraestructure");
      }
      else{
        setInfraestructure("");
      }
    }

    const othercheckChange = (e) => {
      if(Othercheck===""){
        setOthercheck("equipment");
      }
      else{
        setOthercheck("");
      }
    }

  const deletereport = (id) => {

    const requestInit = {
    method:'DELETE'
    }
    fetch('http://20.151.235.246/api/a8/'+id, requestInit)
    .then(res => res.json())
    .then(res => console.log(res))
    .then(res => console.log('hola'))
    setActualizar(true);
  }
  
 
    let i_ = -1;



    var rep = reports.map((reporte,index) => {
      i_+=1;
      var id = reporte.id;
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
            
            <td>{status}</td>
            <td>{nomStu}</td>
            <td>{nomThe}</td>
            <td>{degr}</td>
            <td>{clas}</td>
            <td key={index} className="botones">
              <button className="edit" onClick={(e)=>{setShow(true); setSelecteddata(reports[index]) }}><i class="fa-solid fa-pen-to-square"></i></button>
              <button className="delete" onClick={()=>{deletereport(id)}}><i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
          
            < Modal sshow={sshow}  data={selecteddata} post={index} onClose={()=>{setShow(false);setActualizar(true)}}/>
        
        </>
      )
    }
    )


    return (
      <>
      
      <div className='header'> 
        <img className="logo" src={"/ac3e.png"}/>
        <h1 className="titulo1">A8 Thesis Students</h1>
        <a className="statistics" href="https://app.powerbi.com/view?r=eyJrIjoiOGFhN2I3MzQtY2FlZS00YjQzLWIzNTktNTgwNDNmMWU1MTQxIiwidCI6IjAyNjI1Njc2LTMyMjctNDQwYS05YzY4LWJiNmQyOWRlNDIwNiIsImMiOjR9">Estadísticas</a>
      </div>
      
      <h1 className="title">Ingreso de datos</h1>
      <h3 className="text">Si desea ingresar los datos favor rellene el formulario:</h3>
      
      <div className="formulario">
        <form onSubmit={ev => {
            ev.preventDefault();
            const title = ev.target.title.value;
            //uploadFile
            const lector = new FileReader();
            lector.readAsDataURL(archivosave);
            console.log(archivosave);
            lector.onload = (event) => {
            const data = event.target.result;
        
            const datos = new FormData();
            datos.append('file', data);
            datos.append('filename', "/home/konnits/respaldos/"+{title}+".pdf");
        
            fetch(
              "http://20.151.235.246/file/send_file",
            {
              method: "POST",
              body: datos
            }
            )
          }
            const funccion = async () => {

            
            if(coautors === "text"){
            var coautor = ev.target.coautor.value;
            var coautorInstitution = ev.target.coautorInstitution.value;
            var cotutor_check = "true";
            }
            else{
              var coautor = "";
              var coautorInstitution = "";
              var cotutor_check = "";
            }

            if(others === "text"){
              console.log("var: "+ev.target.otherin.value);
              var otherr = ev.target.otherin.value;
              console.log(otherr);
              var otherInstitution = ev.target.otherInstitution.value;
              var other_check = "true";
              }
              else{
                var otherr = "";
                var otherInstitution = "";
                var other_check = "";
              }
            if(Equipment===""){
              var equipment = "true";
            }
            else{
              var equipment = "";
            }
            if(Information === ""){
              var information = "true";
            }
            else{
              var information = "";
            }
            if(Infraestructure === ""){
              var infraestructure = "true";
            }
            else{
              var infraestructure = "";
            }
            if(Othercheck === ""){
              var othercheck = "true";
            }
            else{
              var othercheck = "";
            }
            const name = ev.target.name.value;
            const run = ev.target.run.value;
            const gender = ev.target.selectbuscador.value;
            const mail = ev.target.mail.value;
            const selectThesis = ev.target.selectThesis.value;
            const title = ev.target.title.value;
            const selectAcademic = ev.target.selectAcademic.value;
            const denomination = ev.target.denomination.value;
            const tutor = ev.target.tutor.value;
            const tutorInstitution = ev.target.tutorInstitution.value;
            const degreeUniversity = ev.target.degreeUniversity.value;
            const startProgram = ev.target.startProgram.value;
            const startThesis = ev.target.startThesis.value;
            const endThesis = ev.target.endThesis.value;
            const selectPosterior = ev.target.selectPosterior.value;
            const InstitutionPosterior = ev.target.InstitutionPosterior.value;
            const comentario = ev.target.comentario.value;
            var filee= "";
            
            
            

            var erased;
            if(name==="" || run==="" || gender==="0" || title===""|| selectAcademic==="0"|| tutor===""|| startThesis===""|| (selectThesis==="Finished" && (selectPosterior==="0" || InstitutionPosterior==="" || ev.target.archivo.value===null ))){
               erased = "erased";
               console.log("entre a borrador");
            }
            else{
               erased = "saved";
               console.log("no entre a borrador");
            }

            
            
            if(selectAcademic === "Professional Title and Master"){
              //Consulta POST profesional title
              let newReport1 = {name :name, run: run, gender : gender, mail: mail, thesis_status :selectThesis, title:title, academic_degree: "1", degree_domination: denomination, tutor:tutor, autor_institution: tutorInstitution ,cotutor_check: cotutor_check,cotutor:coautor,coautor_institution:coautorInstitution , other:otherr, other_institution: otherInstitution,other_check: other_check,degree_u:degreeUniversity, program_starts: startProgram, thesis_starts:startThesis, thesis_end:endThesis, posterior_working:selectPosterior,institution_working:InstitutionPosterior,inv:comentario, file: filee, borrador: erased, equipment:equipment, information:information, infraestructure: infraestructure, other_resource:othercheck }
            const requestInit1 = {
              method:'POST',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify(newReport1)
            }
            await fetch('http://20.151.235.246/api/a8', requestInit1)
            .then(res => res.json())
            .then(res => console.log(res))
            //Consulta POST master
            let newReport2 = {name :name, run: run, gender : gender, mail: mail, thesis_status :selectThesis, title:title, academic_degree: "2", degree_domination: denomination, tutor:tutor, autor_institution: tutorInstitution ,cotutor_check: cotutor_check,cotutor:coautor,coautor_institution:coautorInstitution,other_check: other_check ,other:otherr, other_institution: otherInstitution,degree_u:degreeUniversity, program_starts: startProgram, thesis_starts:startThesis, thesis_end:endThesis, posterior_working:selectPosterior,institution_working:InstitutionPosterior,inv:comentario, file: filee, borrador: erased, equipment:equipment, information:information, infraestructure: infraestructure, other_resource:othercheck}
            const requestInit2 = {
              method:'POST',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify(newReport2)
            }
            await fetch('http://20.151.235.246/api/a8', requestInit2)
            .then(res => res.json())
            .then(res => console.log(res))
            }
            else{
              console.log("holis");
              let newReport = {name :name, run: run, gender : gender, mail: mail, thesis_status :selectThesis, title:title, academic_degree: selectAcademic, degree_domination: denomination, tutor:tutor, autor_institution: tutorInstitution, cotutor_check: cotutor_check,cotutor:coautor,coautor_institution:coautorInstitution,other_check: other_check  ,other:otherr, other_institution: otherInstitution,degree_u:degreeUniversity, program_starts: startProgram, thesis_starts:startThesis, thesis_end:endThesis, posterior_working:selectPosterior,institution_working:InstitutionPosterior,inv:comentario, file: filee, borrador: erased, equipment:equipment, information:information, infraestructure: infraestructure, other_resource:othercheck}
            const requestInit = {
              method:'POST',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify(newReport)
            }
            await fetch('http://20.151.235.246/api/a8', requestInit)
            .then(res => res.json())
            .then(res => console.log(res))
            }
            console.log("holaaa...");
            //uploadFile
            const lector = new FileReader();
            lector.readAsDataURL(archivosave);
            console.log(archivosave);
            lector.onload = (event) => {
            const data = event.target.result;
        
            const datos = new FormData();
            datos.append('file', data);
            datos.append('filename', "/home/konnits/respaldos/"+{title}+".pdf");
        
            fetch(
              "http://localhost:4000/file/send_file",
            {
              method: "POST",
              body: datos
            }
            )
          }
          }

          funccion();
          setActualizar(true);
          //window.location.reload();
            }}>
              
          <span>
            
					  <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
            <input type="text" name="name" id="name" className="titulo" autoComplete="off" placeholder="Student Name"></input>
            
            </label>
            <span className="item"><i class="fa-solid fa-circle-question">
            <p class="innerText">
                Format: First Name and Last Name (e.j., Juan Perez).
                </p >
            </i>
                
              </span>
              
            </span>
            <div>
            
            <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
            <input type="text" name="run" id="run" className="titulo" autoComplete="off" placeholder="Run or Passport"/>
            </label>
              <span className="item"><i class="fa-solid fa-circle-question">
              <p class="innerText">
                Format : Without point and with script (e.j., 12345678-9).
                </p>
              </i>
        
              </span>
              </div>
            <div>
            <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
            <select name="selectbuscador" id="selectbuscador" defaultValue={gender} style={{marginBottom: '10px' }} onChange={e => handleGenderChange(e)}>
              <option value='0' disabled hidden>Gender</option>
              <option value='Female'>Femenino</option>
              <option value='Male'>Masculino</option>
            </select>
            </label>
            </div>
            <div>
            <input type="text" name="mail" id="mail" className="journal" autoComplete="off" placeholder="mail"/>
            </div>
            <div>
            <label>
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
            <input type="text" name="title" id="title" className="journal" autoComplete="off" placeholder="Thesis Title"/>
            </label>
            </div>
            
            <div>
            <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
            <select name="selectAcademic" id="selectAcademic" style={{marginBottom: '10px'}} defaultValue={academic} onChange={e => handleAcademicChange(e)}>
              <option value="0" disabled hidden>Academic Degree</option>
              <option value="Undergraduate degree or profesional title">Undergraduate degree or profesional title</option>
              <option value="Master or equivalent">Master or equivalent</option>
              <option value="PhD degree">PhD degree</option>
              <option value="Professional Title and Master">Professional Title and Master</option>
            </select>
            </label>
            </div>

            <div>
            <input type="text" name="denomination" id="denomination" className="journal" autoComplete="off" placeholder="Degree Denomination"/>
            </div>
            <div>
            <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
            <input type="text" name="tutor" id="tutor" className="journal" autoComplete="off" placeholder="Tutor"/>
            </label>
            <span className="item"><i class="fa-solid fa-circle-question">
            <p class="innerText">
                Format: Last Name, First name initial. (e.j., Perez, J.).
                </p>
            </i>
                
              </span>
              </div>
              <div>
              <label>
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
            <input type="text" name="tutorInstitution" id="tutorInstitution" className="journal" autoComplete="off" placeholder="Tutor Intitution"/>
            </label>
            </div>
            <div>
            <label>Co-tutor?</label> 
            <input type="checkbox" name="checkCoautor" id="checkCoautor" onChange={coautorChange}></input>
            <input type={coautors} name="coautor" id="coautor" autoComplete="off" placeholder="Co-Tutor"></input>
            <input type={coautors} name="coautorInstitution" id="coautorInstitution" autoComplete="off" placeholder="Co-Tutor's Institution"></input>
            </div>
            <div>
            <label>Other?</label> 
            <input type="checkbox" name="checkOther" id="checkOther" onChange={otherChange}></input>
            <input type={others} name="otherin" id="otherin" autoComplete="off" placeholder="Other"></input>
            <input type={others} name="otherInstitution" id="otherInstitution" autoComplete="off" placeholder="Other's Institution"></input>
            </div>
            <div>
            <input type="text" name="degreeUniversity" id="degreeUniversity" className="autor" autoComplete="off" placeholder="University that gives the degree"/>
            </div>
            <div>
            <input type="text" name="startProgram" id="startProgram" className="journal" autoComplete="off" style={{marginRight: '5px'}} placeholder="Year student starts program"/>
            </div>
            <div>
            <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
            <input type="text" name="startThesis" id="startThesis" className="journal" autoComplete="off" placeholder="Year student starts thesis"/>
            
            </label>
            </div>
            <div>
            <input type="text" name="endThesis" id="endThesis" className="journal" autoComplete="off" placeholder="Year student end thesis"/>
            </div>
            <div>
              <label style={{fontWeight: 'bold', marginTop:'15px' ,marginBottom: '5px'}} >Resources provide by the center:</label>
            </div>
            <div>
            <input type="checkbox" name="equipment" id="equipment"  className="checks" onChange={e => equipmentChange(e)}></input>
            <label>Equipment</label>
            <input type="checkbox" name="information" id="information" style={{marginLeft: '20px'}} className="checks" onChange={e => informationChange(e)}></input>
            <label>Information</label>
            <input type="checkbox" name="infraestructure" id="infraestructure" style={{marginLeft: '20px'}} className="checks" onChange={e => infraestructureChange(e)}></input>
            <label>Infraestructure</label>
            <input type="checkbox" name="other" id="other" style={{marginLeft: '20px', marginBottom: '20px'}} className="checks" onChange={e => othercheckChange(e)}></input>
            <label>Other</label>
            
            </div>
            

            <div>
            <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
            <select name="selectThesis" id="selectThesis" defaultValue={thesisStatus} style={{marginBottom:'10px'}} onChange={e => handleStatusChange(e)}>
              <option value="0" disabled hidden>Thesis Status</option>
              <option value="In Progress">In Progress</option>
              <option value="Finished">Finished</option>
            </select>
            </label>
            </div>
            <div>
            <label >
            <span style={{color:"red", marginRight:"5px", visibility:posteriorSelect}}>
            *
          </span>
            <input type= {archivo} name="archivo" id="archivo" accept=".pdf,.doc, .docx"  onChange={e =>fileHandler(e)}></input>
            <span className="item" style={{visibility:posteriorSelect}}><i class="fa-solid fa-circle-question">
            <p class="innerText" >
                Format: .pdf 20mb max or .pdf with cover, index and abstract.
                </p>
            </i>
                
              </span>
            </label>
            </div>
            <div>
              <label >
            <span style={{color:"red", marginRight:"5px", visibility:posteriorSelect}}>
            *
          </span>
            <select name="selectPosterior" id="selectPosterior" style={{visibility:posteriorSelect, marginRight:"5px", marginBottom: '10px'}} defaultValue={posterior} onChange={e => handlePosteriorChange(e)}>
              <option value="0" disabled hidden>Posterior working</option>
              <option value="Private Education">Private Education</option>
              <option value="Business">Business</option>
              <option value="Own entrepreneurship">Own entrepreneurship</option>
              <option value="Goverment">Goverment</option>
              <option value="Public Education">Public Education</option>
              <option value="Social-ONG">Social-ONG</option>
              <option value="In the center">In the center</option>
              <option value="None of the above">None of the above</option>
            </select>
            </label>
            </div>
            <div>
            <label >
            <span style={{color:"red", marginRight:"5px", visibility:posteriorSelect}}>
            *
          </span>
            <input type={ins} name="InstitutionPosterior" id="InstitutionPosterior" style={{width: '280px'}} className="journal" autoComplete="off" placeholder="Institution of Posterior working area"/>
            </label>
            <span className="item" style={{visibility:posteriorSelect}}><i class="fa-solid fa-circle-question">
            <p class="innerText" >
                Institute where it is inserted. If the student is unemployed indicate.
                </p>
            </i>
                
              </span>
            </div>
          <div>
            <input type="text" name="comentario" className="comentario" autoComplete="off" placeholder="Comment"></input>
          </div>
				  
        
          <button type="submit" >Enviar</button>
        </form>
      </div>

      <h1 className="title">Visualización de datos</h1>
      <h3 className="text">Aquí observará los datos ya se envió anteriormente.</h3>

      
      <button className="exports" onClick={()=>{exportData()}}> Exportar datos</button>  

        <div className="tabla"> 
        <table className="table table-success table-striped rounded">
  <thead>
    <tr>
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
</div>


      </>
    );
  }
  
  export default A8;