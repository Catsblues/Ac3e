import "./A8.css";
import React ,{useState, useEffect}from "react";
import Modal from "./modal";



const A8=()=> {

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
    const [other, setOther] = useState("hidden");
    const [archivo, setArchivo] = useState("hidden");
    const [ins, setIns] = useState("hidden");
    const [Equipment, setEquipment] = useState("");
    const [Information, setInformation] = useState("");
    const [Infraestructure, setInfraestructure] = useState("");
    const [Othercheck, setOthercheck] = useState("");
    const [sshow, setShow] = useState(false);
    const [archivosave , setArchivosave] =useState(null);
    const [reports, setReports] = useState([]);
    const[selecteddata, setSelecteddata] = useState([]);
    

    useEffect(() => {
      const getReports = async () => {
        await fetch('http://localhost:9000/api')
        .then(res => res.json())
        .then(res => setReports(res))
      }
      getReports()
    }, [] )


    const fileHandler=(e) => {
      setArchivosave(e.target.files[0])
    }

    const handleGenderChange = (e) => {
      console.log(e.target.value);
      setGender(e.target.value)
        
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


  const deletereport = async (id) => {

    const requestInit = {
    method:'DELETE'
    }
    await fetch('http://localhost:9000/api/'+id, requestInit)
    .then(res => res.json())
    .then(res => console.log(res))
    .then(res => console.log('hola'))
    
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
            <td key={index} className="botones">
              <button className="edit" onClick={(e)=>{setShow(true); setSelecteddata(reports[index]) }}><i class="fa-solid fa-pen-to-square"></i></button>
              <button className="delete" onClick={()=>{deletereport(id);window.location.reload();}}><i class="fa-solid fa-trash"></i></button>
            </td>
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

            const funccion = async () => {

    
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
            var selectResource="";
            if(Equipment!=="" && Information!=="" && Infraestructure!=="" && Othercheck!==""){
              selectResource = "Equipment, information, insfraestructure and other";
            }
            else if(Equipment!=="" && Information!=="" && Infraestructure!==""){
              selectResource = "Equipment, information, insfraestructure";
            }
            else if(Equipment!=="" && Information!=="" && Othercheck!==""){
              selectResource = "Equipment, information and other";
            }
            else if(Equipment!=="" && Infraestructure!=="" && Othercheck!==""){
              selectResource = "Equipment, insfraestructure and other";
            }
            else if(Information!=="" && Infraestructure!=="" && Othercheck!==""){
              selectResource = "Information, insfraestructure and other";
            }
            else if(Equipment!=="" && Information!==""){
              selectResource = "Equipment and information";
            }
            else if(Equipment!=="" && Othercheck!==""){
              selectResource = "Equipment and other";
            }
            else if(Equipment!=="" && Infraestructure!==""){
              selectResource = "Equipment and insfraestructure";
            }
            else if(Information!=="" && Infraestructure!==""){
              selectResource = "Information and insfraestructure";
            }
            else if( Information!=="" && Othercheck!==""){
              selectResource = "Information and other";
            }
            else if(Infraestructure!=="" && Othercheck!==""){
              selectResource = "Infraestructure and other";
            }
            else if(Equipment!==""){
              selectResource = "Equipment";
            }
            else if( Information!=="" ){
              selectResource = "Information";
            }
            else if( Infraestructure!==""){
              selectResource = "Insfraestructure";
            }
            else if(Othercheck!==""){
              selectResource = "Other";
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
            
            
            if(archivosave!==null){
              const formdata = new FormData()
              formdata.append('respaldo', archivosave)
          
              await fetch('http://localhost:9000/respaldos/post', {
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
            await fetch('http://localhost:9000/api', requestInit1)
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
            await fetch('http://localhost:9000/api', requestInit2)
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
            await fetch('http://localhost:9000/api', requestInit)
            .then(res => res.json())
            .then(res => console.log(res))
            .then(res => console.log('hola'))
            }
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
              <option value='1'>Femenino</option>
              <option value='2'>Masculino</option>
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
              <option value="1">Undergraduate degree or profesional title</option>
              <option value="2">Master o equivalent</option>
              <option value="3">PhD degree</option>
              <option value="4">Profesional Title and Master</option>
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
            <input type={other} name="other" id="other" autoComplete="off" placeholder="Other"></input>
            <input type={other} name="otherInstitution" id="otherInstitution" autoComplete="off" placeholder="Other's Institution"></input>
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