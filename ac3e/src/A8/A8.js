import "./A8.css";
import React ,{useState, useEffect}from "react";
import Modal from "./modal";



const A8=()=> {

    const [gender, setGender] = useState("0");
    const [thesisStatus, setThesisStatus] = useState("0");
    const [academic, setAcademic] = useState("0");
    const [resource, setResource] = useState("0");
    const [posterior, setPosterior] = useState("0");
    const [register, setRegister] = useState("0");
    const [posteriorSelect, setPosteriorSelect] = useState("hidden");
    const [filtroSelect, setFiltroSelect] = useState("hidden");
    const [inputText, setInputText] = useState("hidden");
    const [search, setSearch] = useState("");
    const [check, setCheck] = useState(localStorage.getItem("check"));
    const [coautors, setCoautors] = useState("hidden");
    const [other, setOther] = useState("hidden");
    const [archivo, setArchivo] = useState("hidden");
    const [ins, setIns] = useState("hidden");
    const [file, setFile] = useState(null);
    const [finish, setFinish] = useState("hidden");

    const [sshow, setShow] = useState(false);

    const [archivosave , setArchivosave] =useState(null);

    const [reports, setReports] = useState([]);
    
    const[selecteddata, setSelecteddata] = useState([]);
    

    useEffect(() => {
      const getReports = () => {
        fetch('http://localhost:9000/api')
        .then(res => res.json())
        .then(res => setReports(res))
      }
      getReports()
    }, [] )

    function requireEval (props){
      return (
        <label>
          
          <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
          {props.children}
        </label>
      );
    }

    const fileHandler=(e) => {
      setArchivosave(e.target.files[0])
    }

    const handleGenderChange = (e) => {
      console.log(e.target.value);
      setGender(e.target.value)
        
    }

    const handleRegisterChange = (e) => {
      
      setRegister(e.target.value)
        
    }

    const handleStatusChange = (e) => {
    
      setThesisStatus(e.target.value)
      if(e.target.value==="2"){
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

const handleResourceChange = (e) => {
    
  setResource(e.target.value)
  
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
      if(other==="hidden"){
        setOther("text");
      }
      else{
        setOther("hidden");
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


  const deletereport = (id) => {

    const requestInit = {
    method:'DELETE'
    }
    fetch('http://localhost:9000/api/'+id, requestInit)
    .then(res => res.json())
    .then(res => console.log(res))
    .then(res => console.log('hola'))
    window.location.reload();
    
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

 
    let i_ = -1;



    var rep = reports.map((reporte,index) => {
      i_+=1;
      var id = reporte.id;
      if(reporte.thesis_status==="1"){
        var status = "In progress";
      }
      else if(reporte.thesis_status==="0"){
        var status = "";
      }
      else{
        var status = "Finished";
      }
      var nomStu = reporte.name;
      var nomThe = reporte.title;
      if(reporte.academic_degree==="1"){
        var degr = "Undergraduate degree or profesional title";
      }
      else if(reporte.academic_degree==="2"){
        var degr = "Master or equivalent";
      }
      else if(reporte.academic_degree==="3"){
        var degr = "PhD degree";
      }
      else{
        var degr = "";
      }
      var clas;
      if(reporte.borrador==="1"){
        clas="erased";
      }
      else{
        clas="save"
      }

      
      let id_ =reporte.id;
      let name =reporte.name;
      let run =reporte.run;
      let gender =reporte.gender;
      let mail =reporte.mail;
      let thesis_Status =reporte.thesis_status;
      let title =reporte.title;
      let academic_degree =reporte.academic_degree;
      let degree_domination =reporte.degree_domination;
      let tutor =reporte.tutor;
      let cotutor =reporte.cotutor;
      let other =reporte.other;
      let degree_u =reporte.degree_u;
      let program_starts = reporte.program_starts;
      let thesis_starts =reporte.thesis_starts;
      let thesis_end =reporte.thesis_end;
      let resouse_center =reporte.resourse_center;
      let posterior_working =reporte.posterior_working;
      let institution_working =reporte.institution_working;
      let inv =reporte.inv;
      let file=reporte.file;
      let autor_institution=reporte.autor_institution;
      let coautor_institution =reporte.coautor_institution;
      let other_institution =reporte.other_institution;

      console.log("reporteeee");

      console.log(reporte);
      return(
        <>
          <tr key={index}>
            
            <td>{status}</td>
            <td>{nomStu}</td>
            <td>{nomThe}</td>
            <td>{degr}</td>
            <td>{clas}</td>
            <tr key={index} className="botones">
              <button className="edit" onClick={(e)=>{setShow(true); setSelecteddata(reports[index]) }}><i class="fa-solid fa-pen-to-square"></i></button>
              <button className="delete" onClick={()=>{deletereport(id)}}><i class="fa-solid fa-trash"></i></button>
            </tr>
          </tr>
          
            < Modal sshow={sshow}  data={selecteddata} post={index} onClose={()=>setShow(false)}/>
        
        </>
      )
    }
    )


    console.log(rep);


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

    
            if(coautors === "text"){
            var coautor = ev.target.coautor.value;
            var coautorInstitution = ev.target.coautorInstitution.value;
            }
            else{
              var coautor = "";
              var coautorInstitution = "";
            }

            if(other === "text"){
              var other = ev.target.other.value;
              var otherInstitution = ev.target.otherInstitution.value;
              }
              else{
                var other = "";
                var otherInstitution = "";
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
            const selectResource = ev.target.selectResource.value;
            const selectPosterior = ev.target.selectPosterior.value;
            const InstitutionPosterior = ev.target.InstitutionPosterior.value;
            const comentario = ev.target.comentario.value;
            var filee= "";
            
            
            if(archivosave!==null){
              const formdata = new FormData()
              formdata.append('respaldo', archivosave)
          
              fetch('http://localhost:9000/respaldos/post', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: formdata
              })
              .then(res => res.json())
              .then(res => console.log(res))
              .catch(err => {
                console.error(err)
              })
              

            }

            var erased;
            if(name==="" || run==="" || gender==="0" || title===""|| selectAcademic==="0"|| tutor===""|| startThesis===""|| (selectThesis==="2" && (selectPosterior==="0" || InstitutionPosterior==="" || ev.target.archivo.value===null ))){
               erased = "1";
               console.log("entre a borrador");
            }
            else{
               erased = "0";
               console.log("no entre a borrador");
            }

            
            console.log(selectAcademic);
            if(selectAcademic === "4"){
              console.log("holis");
              //Consulta POST profesional title
              let newReport1 = {name :name, run: run, gender : gender, mail: mail, thesis_status :selectThesis, title:title, academic_degree: "1", degree_domination: denomination, tutor:tutor, autor_institution: tutorInstitution ,cotutor:coautor,coautor_institution:coautorInstitution ,other:other, other_institution: otherInstitution,degree_u:degreeUniversity, program_starts: startProgram, thesis_starts:startThesis, thesis_end:endThesis, resourse_center:selectResource, posterior_working:selectPosterior,institution_working:InstitutionPosterior,inv:comentario, file: filee, borrador: erased}
            const requestInit1 = {
              method:'POST',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify(newReport1)
            }
            fetch('http://localhost:9000/api', requestInit1)
            .then(res => res.json())
            .then(res => console.log(res))
            .then(res => console.log('hola'))
            //Consulta POST master
            console.log("hola miau");
            let newReport2 = {name :name, run: run, gender : gender, mail: mail, thesis_status :selectThesis, title:title, academic_degree: "2", degree_domination: denomination, tutor:tutor, autor_institution: tutorInstitution ,cotutor:coautor,coautor_institution:coautorInstitution ,other:other, other_institution: otherInstitution,degree_u:degreeUniversity, program_starts: startProgram, thesis_starts:startThesis, thesis_end:endThesis, resourse_center:selectResource, posterior_working:selectPosterior,institution_working:InstitutionPosterior,inv:comentario, file: filee, borrador: erased}
            const requestInit2 = {
              method:'POST',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify(newReport2)
            }
            fetch('http://localhost:9000/api', requestInit2)
            .then(res => res.json())
            .then(res => console.log(res))
            .then(res => console.log('hola'))
            }
            else{
              let newReport = {name :name, run: run, gender : gender, mail: mail, thesis_status :selectThesis, title:title, academic_degree: selectAcademic, degree_domination: denomination, tutor:tutor, autor_institution: tutorInstitution ,cotutor:coautor,coautor_institution:coautorInstitution ,other:other, other_institution: otherInstitution,degree_u:degreeUniversity, program_starts: startProgram, thesis_starts:startThesis, thesis_end:endThesis, resourse_center:selectResource, posterior_working:selectPosterior,institution_working:InstitutionPosterior,inv:comentario, file: filee, borrador: erased}
            const requestInit = {
              method:'POST',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify(newReport)
            }
            fetch('http://localhost:9000/api', requestInit)
            .then(res => res.json())
            .then(res => console.log(res))
            .then(res => console.log('hola'))
            }
           window.location.reload();
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
                First name and last name.
                </p >
            </i>
                
              </span>
              
            </span>
            <div>
            
            <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
            <input type="text" name="run" id="run" className="titulo" autoComplete="off" placeholder="Run o Passport"/>
            </label>
              <span className="item"><i class="fa-solid fa-circle-question">
              <p class="innerText">
                Writing without point and with script.
                </p>
              </i>
        
              </span>
              </div>
            <div>
            <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
            <select name="selectbuscador" id="selectbuscador" defaultValue={gender} onChange={e => handleGenderChange(e)}>
              <option value='0' disabled hidden>Gender</option>
              <option value='1'>Femenino</option>
              <option value='2'>Masculino</option>
            </select>
            </label>

            <input type="text" name="mail" id="mail" className="journal" autoComplete="off" placeholder="mail"/>
            </div>
            <div>
            <label >
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
              <option value="1">Undergraduate degree or profesional title</option>
              <option value="2">Master o equivalent</option>
              <option value="3">PhD degree</option>
              <option value="4">Profesional Title and Master</option>
            </select>
            </label>
            

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
                Last name followed by "," and first name initial.
                </p>
            </i>
                
              </span>
              <label >
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
            <input type={other} name="other" id="other" autoComplete="off" placeholder="Other"></input>
            <input type={other} name="otherInstitution" id="otherInstitution" autoComplete="off" placeholder="Other's Institution"></input>
            </div>
            <div>
            <input type="text" name="degreeUniversity" id="degreeUniversity" className="autor" autoComplete="off" placeholder="University that gives the degree"/>
            </div>
            <div>
            <input type="text" name="startProgram" id="startProgram" className="journal" autoComplete="off" style={{marginRight: '5px'}} placeholder="Year student starts program"/>
            <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
            <input type="text" name="startThesis" id="startThesis" className="journal" autoComplete="off" placeholder="Year student starts thesis"/>

            </label>
            <input type="text" name="endThesis" id="endThesis" className="journal" autoComplete="off" placeholder="Year student end thesis"/>
            </div>
            <div>
            <select name="selectResource" id="selectResource" style={{marginBottom: '10px'}} defaultValue={resource} onChange={e => handleResourceChange(e)}>
              <option value="0" disabled hidden>Resources provide by the center</option>
              <option value="1">Just equipment</option>
              <option value="2">Just Information</option>
              <option value="3">Just Infraestructure</option>
              <option value="4">Equipment and Information</option>
              <option value="5">Equipment and Infraestructure</option>
              <option value="6">Information and Infraestructure</option>
              <option value="7">Equipment, Information and Infraestructure</option>
              <option value="8">Other</option>
            </select>
            </div>
            

            <div>
            <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
            <select name="selectThesis" id="selectThesis" defaultValue={thesisStatus} onChange={e => handleStatusChange(e)}>
              <option value="0" disabled hidden>Thesis Status</option>
              <option value="1">In Progress</option>
              <option value="2">Finished</option>
            </select>
            </label>
            </div>
            <div>
            <label >
            <span style={{color:"red", marginRight:"5px", visibility:posteriorSelect}}>
            *
          </span>
            <input type= {archivo} name="archivo" id="archivo" accept=".pdf,.doc, .docx"  onChange={e =>fileHandler(e)}></input>
            </label>
            <span className="item" style={{visibility:posteriorSelect}}><i class="fa-solid fa-circle-question">
            <p class="innerText" >
                Only pdf, if it weighs more than 20 megabytes attach pdf with cover, index and abstract.
                </p>
            </i>
                
              </span>

              <label >
            <span style={{color:"red", marginRight:"5px", visibility:posteriorSelect}}>
            *
          </span>
            <select name="selectPosterior" id="selectPosterior" style={{visibility:posteriorSelect, marginRight:"5px"}} defaultValue={posterior} onChange={e => handlePosteriorChange(e)}>
              <option value="0" disabled hidden>Posterior working</option>
              <option value="1">Private Education</option>
              <option value="2">Business</option>
              <option value="3">Own entrepreneurship</option>
              <option value="4">Goverment</option>
              <option value="5">Public Education</option>
              <option value="6">Social-ONG</option>
              <option value="7">In the center</option>
              <option value="8">None of de above</option>
            </select>
            </label>


            <label >
            <span style={{color:"red", marginRight:"5px", visibility:posteriorSelect}}>
            *
          </span>
            <input type={ins} name="InstitutionPosterior" id="InstitutionPosterior" style={{width: '280px'}} className="journal" autoComplete="off" placeholder="Institution of Posterior working area"/>
            </label>
            <span className="item" style={{visibility:posteriorSelect}}><i class="fa-solid fa-circle-question">
            <p class="innerText" >
                Institute where it is inserted. If you are unemployed indicate.
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