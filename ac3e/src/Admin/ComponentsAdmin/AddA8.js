import "./AddA8.css";
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";


const AddA8 = ({ sshow,onClose }) => {

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
    const [checkCoautor, setCheckCoautor] = useState("false");
    const [coautors, setCoautors] = useState("hidden");
    const [other, setOther] = useState("hidden");
    const [archivo, setArchivo] = useState("hidden");
    const [ins, setIns] = useState("hidden");
    const [file, setFile] = useState(null);
    const [first, setFirst] = useState(0);
    const [actualizar, setActualizar] = useState(false);
    const [filtro, setFiltro] = useState("default");
    const [textfilter, setTextfilter] = useState("hidden");
    const [statusfilter, setStatusfilter] = useState("hidden");
    const [academicfilter, setAcademicfilter] = useState("hidden");
    const [savefilter, setSavefilter] = useState("hidden");
   
    const [check, setCheck] = useState(localStorage.getItem("check"));
    
    const [others, setOthers] = useState("hidden");
    
    const [Equipment, setEquipment] = useState("false");
    const [Information, setInformation] = useState("false");
    const [Infraestructure, setInfraestructure] = useState("false");
    const [Othercheck, setOthercheck] = useState("false");
    
    const [archivosave , setArchivosave] =useState(null);
    const [reports, setReports] = useState([]);
    const[selecteddata, setSelecteddata] = useState([]);
    const [filtrostatus, setFiltrostatus] = useState("default");
    const [filtroacademic, setFiltroacademic] = useState("default");
    const [filtrosave, setFiltrosave] = useState("default");
    const [namer, setNamer] = useState("");
    
    const [showw, setShoww] = useState(false);
    


    if (!sshow) {
        return null;
    }
    
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    const researcher = decodedToken.researcher;
    
    
    const  fileHandler = (e) => {
        setArchivosave(e.target.files[0])
      }
  
      const handleGenderChange = (e) => {
        console.log(e.target.value);
        setGender(e.target.value)
          
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
   

   
    






    return (
        <>
            <div className="overlay">



                <div className="formulario2">
                    <button className="boton" onClick={() => { onClose(true); setShoww(false) }}>X</button>

                    <form onSubmit={async (ev) => {
                         ev.preventDefault();
                         const title = ev.target.title.value;
                         //uploadFile
                         if(archivosave !== null){
                           console.log("entre");
                           const lector = new FileReader();
                           lector.readAsDataURL(archivosave);
                           console.log(archivosave);
                           lector.onload = (event) => {
                           const data = event.target.result;
                       
                           const datos = new FormData();
                           datos.append('file', data);
                           datos.append('filename', "/home/konnits/respaldos/"+title+".pdf");
                     
                         fetch(
                           "http://20.151.235.246/file/send_file",
                         {
                           method: "POST",
                           body: datos
                         }
                         )
                       }
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
             
                         
                         
                         if(selectAcademic === "Professional title and master"){
                           //Consulta POST profesional title
                           console.log("entre a profesional title");
                           let newReport1 = {researcher: researcher ,studentName :name, run: run, gender : gender, studentMail: mail, thesisStatus :selectThesis, thesisTitle:title, academicDegree: "Undergraduate degree or professional title", degree_domination: denomination, tutor:tutor, autor_institution: tutorInstitution ,cotutor_check: cotutor_check,cotutor:coautor,coautor_institution:coautorInstitution , other:otherr, other_institution: otherInstitution,other_check: other_check,degree_u:degreeUniversity, program_starts: startProgram, thesis_starts:startThesis, thesis_end:endThesis, posterior_working:selectPosterior,institution_working:InstitutionPosterior,inv:comentario, file: filee, borrador: erased, equipment:equipment, information:information, infraestructure: infraestructure, other_resource:othercheck }
                         const requestInit1 = {
                           method:'POST',
                           headers: {'Content-Type':'application/json'},
                           body: JSON.stringify(newReport1)
                         }
                         fetch('http://20.151.235.246/api/a8', requestInit1)
                         .then(res => res.json())
                         .then(res => console.log(res))
                         //Consulta POST master
                         console.log("entre a master");
                         let newReport2 = {researcher:researcher, studentName :name, run: run, gender : gender, studentMail: mail, thesisStatus :selectThesis, thesisTitle:title, academicDegree: "Master or equivalent", degree_domination: denomination, tutor:tutor, autor_institution: tutorInstitution ,cotutor_check: cotutor_check,cotutor:coautor,coautor_institution:coautorInstitution,other_check: other_check ,other:otherr, other_institution: otherInstitution,degree_u:degreeUniversity, program_starts: startProgram, thesis_starts:startThesis, thesis_end:endThesis, posterior_working:selectPosterior,institution_working:InstitutionPosterior,inv:comentario, file: filee, borrador: erased, equipment:equipment, information:information, infraestructure: infraestructure, other_resource:othercheck}
                         const requestInit2 = {
                           method:'POST',
                           headers: {'Content-Type':'application/json'},
                           body: JSON.stringify(newReport2)
                         }
                         fetch('http://20.151.235.246/api/a8', requestInit2)
                         .then(res => res.json())
                         .then(res => console.log(res))
                         }
                         else{
                           console.log("holis");
                           let newReport = {researcher:researcher, studentName :name, run: run, gender : gender, studentMail: mail, thesisStatus :selectThesis, thesisTitle:title, academicDegree: selectAcademic, degree_domination: denomination, tutor:tutor, autor_institution: tutorInstitution, cotutor_check: cotutor_check,cotutor:coautor,coautor_institution:coautorInstitution,other_check: other_check  ,other:otherr, other_institution: otherInstitution,degree_u:degreeUniversity, program_starts: startProgram, thesis_starts:startThesis, thesis_end:endThesis, posterior_working:selectPosterior,institution_working:InstitutionPosterior,inv:comentario, file: filee, borrador: erased, equipment:equipment, information:information, infraestructure: infraestructure, other_resource:othercheck}
                         const requestInit = {
                           method:'POST',
                           headers: {'Content-Type':'application/json'},
                           body: JSON.stringify(newReport)
                         }
                         fetch('http://20.151.235.246/api/a8', requestInit)
                         .then(res => res.json())
                         .then(res => console.log(res))
                         }
                         
                       }
             
                       funccion();
                       onClose(true);
                       window.location.reload();
                    }}>
                        <div>
                        <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
                        <input type="text" name="name" id="name" className="autor" autoComplete="off" placeholder="Student Name" />
                        </label>
                        <span className="item"><i class="fa-solid fa-circle-question"><div class="innerText">
                                First name and last name.
                            </div><div class="innerText">
                            Format: First Name and Last Name (e.j., Juan Perez).
                            </div></i>
                            
                        </span>
                        </div>
                        <div>
                        <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
                        <input type="text" name="run" id="run" className="autor" autoComplete="off" placeholder="Run o passport" />
                        </label>
                        <span className="item"><i class="fa-solid fa-circle-question"><div class="innerText">
                        Format : Without point and with script (e.j., 12345678-9).
                            </div></i>
                            
                        </span>
                        </div>
                        <div>
                        <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
                        <select name="selectbuscador" id="selectbuscador" defaultValue={gender}  onChange={e => handleGenderChange(e)}>
                            <option value='0' disabled hidden>Gender</option>
                            <option value='Female'>Female</option>
                            <option value='Male'>Male</option>
                        </select>
                        </label>

                        <input type="text" name="mail" id="mail" className="journal" autoComplete="off" placeholder="mail" />
                        </div>
                        <div>
                        <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
                        <input type="text" name="title" id="title" className="journal" autoComplete="off"  placeholder="Thesis Title" />
                        </label>
                        </div>
                        <div>
                        <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
                        <select name="selectAcademic" id="selectAcademic" defaultValue={academic} onChange={e => handleAcademicChange(e)}>
                            <option value="0" disabled hidden>Academic Degree</option>
                            <option value="Undergraduate degree or professional title">Undergraduate degree or professional title</option>
                            <option value="Master or equivalent">Master o equivalent</option>
                            <option value="PhD degree">PhD degree</option>
                            <option value="Professional title and master">Professional title and master</option>
                        </select>
                        </label>

                        <input type="text" name="denomination" id="denomination" className="journal" autoComplete="off"  placeholder="Degree Denomination" />
                        </div>
                        <div>
                        <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
                        <input type="text" name="tutor" id="tutor" className="journal" autoComplete="off"  placeholder="Tutor" />
                        </label>
                        <span className="item"><i class="fa-solid fa-circle-question">
                        <div class="innerText">
                        Format: Last Name, First name initial. (e.j., Perez, J.).
                            </div>
                        </i>
                            
                        </span>
                        <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
                        <input type="text" name="tutorInstitution" id="tutorInstitution" className="autor" autoComplete="off" placeholder="Tutor's Institution" />
                        </label>
                        </div>
                        <div>
                        <label>Co-tutor?</label>
                        <input type="checkbox" name="checkCoautor" id="checkCoautor"  onChange={coautorChange}></input>
                        
                        <input type="text" name="coautor" id="coautor"  autoComplete="off" placeholder="Co-Tutor"></input>
                        
                        <input type="text" name="coautorInstitution" id="coautorInstitution" autoComplete="off"  placeholder="Co-Tutor's Institution"></input>
                        
                        </div>
                        <div>
                        <label>Other?</label>
                        <input type="checkbox" name="checkOther" id="checkOther"  onChange={otherChange}></input>
             
                        <input type="text" name="other" id="other" autoComplete="off"  placeholder="Other"></input>
                        
                        <input type="text" name="otherInstitution" id="otherInstitution" autoComplete="off"  placeholder="Other's Institution"></input>
                        
                        
                        </div>
                        <div>
                        <input type="text" name="degreeUniversity" id="degreeUniversity" className="journal"  autoComplete="off" placeholder="University that gives the degree" />
                        </div>
                        <div>
                        <input type="text" name="startProgram" id="startProgram" className="journal"  autoComplete="off" placeholder="Year student starts program" />
                        <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
                        <input type="text" name="startThesis" id="startThesis" className="journal"  autoComplete="off" placeholder="Year student starts thesis" />
                        </label>
                        <input type="text" name="endThesis" id="endThesis" className="journal"  autoComplete="off" placeholder="Year student end thesis" />
                        </div>
                        <div>
              <label style={{fontWeight: 'bold', marginTop:'15px' ,marginBottom: '5px'}} >Resources provide by the center:</label>
            </div>
            <div>
            <input type="checkbox" name="equipment" id="equipment"  className="checks"  onChange={e => equipmentChange(e)}></input>
            <label>Equipment</label>
            <input type="checkbox" name="information" id="information" style={{marginLeft: '20px'}} className="checks"  onChange={e => informationChange(e)}></input>
            <label>Information</label>
            <input type="checkbox" name="infraestructure" id="infraestructure" style={{marginLeft: '20px'}} className="checks"  onChange={e => infraestructureChange(e)}></input>
            <label>Infraestructure</label>
            <input type="checkbox" name="other" id="other" style={{marginLeft: '20px', marginBottom: '20px'}} className="checks"  onChange={e => othercheckChange(e)}></input>
            <label>Other</label>
            
            </div>


                        <div>
                        <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
                        <select name="selectThesis" id="selectThesis"  defaultValue={thesisStatus} onChange={e => handleStatusChange(e)}>
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
                        <input type={archivo} name="archivo" id="archivo" onChange={e => fileHandler(e)} ></input>
                        </label>
                        <span className="item"><i class="fa-solid fa-circle-question" style={{visibility:posteriorSelect}}><div class="innerText" >
                        Format: .pdf 20mb max or .pdf with cover, index and abstract. You must include the name of the thesis in this form to send document.
                            </div></i>
                            
                        </span>
                        <label >
            <span style={{color:"red", marginRight:"5px", visibility:posteriorSelect}}>
            *
          </span>
                        <select name="selectPosterior" id="selectPosterior" defaultValue={posterior} style={{ visibility: posteriorSelect }}  onChange={e => handlePosteriorChange(e)}>
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

                        <label >
            <span style={{color:"red", marginRight:"5px", visibility:posteriorSelect}}>
            *
          </span>
                        <input type={ins} name="InstitutionPosterior" id="InstitutionPosterior"  className="journal" autoComplete="off" placeholder="Institution of Posterior working area" />
                        </label>
                        <span className="item"><i class="fa-solid fa-circle-question" style={{visibility:posteriorSelect}}><div class="innerText" >
                        Institute where it is inserted. If the student is unemployed indicate.
                            </div></i>
                            
                        </span>
                        </div>

                        <div>
                            <input type="text" name="comentario" className="comentario" autoComplete="off"  placeholder="Comment"></input>
                        </div>


                        <button type="submit" >Submit</button>
                    </form>
                </div>


            </div>


        </>
    );
}

export default AddA8;
