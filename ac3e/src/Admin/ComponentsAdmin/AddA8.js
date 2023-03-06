import "./AddA8.css";
import React, { useState, useEffect } from "react";



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
    
    const [showw, setShoww] = useState(false);
    var equip = (data.equipment=='true');
    var infra = (data.infraestructure=='true');
    var info = (data.information=='true');
    var other_s = (data.other_resource=='true');
    var cotutorcheck = (data.cotutor_check=='true');
    var othercheck = (data.other_check=='true');


    if (!sshow) {
        return null;
    }
    
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    const researcher = decodedToken.researcher;
    
    if(data.thesis_status==="Finished" && first===0){
            
        setPosteriorSelect("visible");
        setArchivo("file");
        setIns("text");
        setFirst(1);
    }
    else if(data.thesis_status==="In progress" && first===0){
            setPosteriorSelect("hidden");
            setArchivo("hidden");
            setIns("hidden");
            setFirst(1);
        }
    
   

    const handleGenderChange = (e) => {
        console.log(e.target.value);
        setGender(e.target.value)

    }




    const handleStatusChange = (e) => {

        setThesisStatus(e.target.value)
        if (e.target.value === "Finished") {
            setArchivo("file");
            setPosteriorSelect("visible");
            setIns("text");
        }
        else {
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
        if (cotutorcheck === false) {
            setCoautors("text");
            cotutorcheck = true;
        }
        else {
            setCoautors("hidden");
            cotutorcheck = false;
        }
    }

    const otherChange = (e) => {
        if (othercheck === false) {
            setOther("text");
            othercheck = true;
        }
        else {
            setOther("hidden");
            othercheck = false;
        }
    }


    const fileChange = (e) => {
        setFile(e.target.files[0]);
        console.log(file);
        console.log(e.target.files[0]);
        const formdata = new FormData()
        formdata.append('pdf', file)
        console.log(formdata);
    }

    const equipmentChange = (e) => {
        if(equip===false){
          equip = true;
        }
        else{
          equip = false;
        }
      }
  
      const informationChange = (e) => {
        if(info===false){
          info = true;
        }
        else{
          info=false;
        }
      }
  
      const infraestructureChange = (e) => {
        if(infra===false){
          infra = true;
        }
        else{
          infra = false;
        }
      }
  
      const othercheckChange = (e) => {
        if(other_s===false){
          other_s = true;
        }
        else{
          other_s = false;
        }
      }

    
    
    

    const formFunction = (ev) => {
       


                        if (coautors === "text") {
                            var coautor = ev.target.coautor.value;
                            var coautorInstitution = ev.target.coautorInstitution.value;
                        }
                        else {
                            var coautor = "";
                            var coautorInstitution = "";
                        }

                        if (other === "text") {
                            var other = ev.target.other.value;
                            var otherInstitution = ev.target.otherInstitution.value;
                        }
                        else {
                            var other = "";
                            var otherInstitution = "";
                        }

                        if(equip===true){
                            var equipment = "true";
                        }
                        else{
                            var equipment = "";
                        }
                        if(info===true){
                            var information = "true";
                        }
                        else{
                            var information = "";
                        }
                        if(infra===true){
                            var infraestructure = "true";
                        }
                        else{
                            var infraestructure = "";
                        }
                        if(other_s===true){
                            var other_resource = "true";
                        }
                        else{
                            var other_resource = "";
                        }
                        if(cotutorcheck===true){
                            var cotutor_check = "true";
                        }
                        else{
                            var cotutor_check = "";
                        }
                        if(othercheck===true){
                            var other_check = "true";
                        }
                        else{
                            var other_check = "";
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
                        const filee = "";
                        
                        


                        var erased;
                        if(name==="" || run==="" || gender==="0" || title===""|| selectAcademic==="0"|| tutor===""|| startThesis===""|| (selectThesis==="2" && (selectPosterior==="0" || InstitutionPosterior==="" || ev.target.archivo.value===null ))){
                            
                            erased = "erased";
                            console.log("entre a borrador");
                            }
                            else{
                            erased = "saved";
                            console.log("no entre a borrador");
                            }


                        if(selectAcademic === "Professional title and master"){
                                //Consulta PUT profesional title

                            let newReport1 = {
                                researcher: researcher,
                                name :name, 
                                run: run, 
                                gender : gender, 
                                mail: mail, 
                                thesis_status :selectThesis, 
                                title:title, 
                                academic_degree: "Undergraduate degree or professional title", 
                                degree_domination: denomination, 
                                tutor:tutor, 
                                cotutor:coautor, 
                                other:other, 
                                autor_institution: tutorInstitution,
                                coautor_institution: coautorInstitution,
                                cotutor_check:cotutor_check,
                                other_institution: otherInstitution,
                                other_check:other_check,
                                degree_u:degreeUniversity, 
                                program_starts: startProgram, 
                                thesis_starts:startThesis, 
                                thesis_end:endThesis, 
                                posterior_working:selectPosterior,
                                institution_working:InstitutionPosterior,
                                inv:comentario, 
                                file: filee, 
                                borrador:erased,
                                equipment:equipment,
                                information:information,
                                infraestructure:infraestructure,
                                other_resource:other_resource

                            }
                            const requestInit1 = {
                                method:'PUT',
                                headers: {'Content-Type':'application/json'},
                                body: JSON.stringify(newReport1)
                              }
                              fetch('http://20.151.235.246/api/a8/'+data.id, requestInit1)
                              .then(res => res.json())
                              .then(res => console.log(res))
                              .then(res => console.log('hola'))
                              //Consulta PUT master
                              let newReport2 = {
                                researcher: researcher,
                                name :name, 
                                run: run, 
                                gender : gender, 
                                mail: mail, 
                                thesis_status :selectThesis, 
                                title:title, 
                                academic_degree: "Master or equivalent", 
                                degree_domination: denomination, 
                                tutor:tutor, 
                                cotutor:coautor, 
                                other:other, 
                                autor_institution: tutorInstitution,
                                coautor_institution: coautorInstitution,
                                other_institution: otherInstitution,
                                cotutor_check:cotutor_check,
                                other_check:other_check,
                                degree_u:degreeUniversity, 
                                program_starts: startProgram, 
                                thesis_starts:startThesis, 
                                thesis_end:endThesis,  
                                posterior_working:selectPosterior,
                                institution_working:InstitutionPosterior,
                                inv:comentario, 
                                file: filee, 
                                borrador:erased,
                                equipment:equipment,
                                information:information,
                                infraestructure:infraestructure,
                                other_resource:other_resource
                              }
                              const requestInit2 = {
                                method:'PUT',
                                headers: {'Content-Type':'application/json'},
                                body: JSON.stringify(newReport2)
                              }
                              fetch('http://20.151.235.246/api/a8/'+data.id, requestInit2)
                              .then(res => res.json())
                              .then(res => console.log(res))
                              .then(res => console.log('hola'))
                              }
                              else{
                                let newReport = {
                                    researcher: researcher,
                                    name :name, 
                                run: run, 
                                gender : gender, 
                                mail: mail, 
                                thesis_status :selectThesis, 
                                title:title, 
                                academic_degree: selectAcademic, 
                                degree_domination: denomination, 
                                tutor:tutor, 
                                cotutor:coautor, 
                                other:other, 
                                autor_institution: tutorInstitution,
                                coautor_institution: coautorInstitution,
                                other_institution: otherInstitution,
                                cotutor_check:cotutor_check,
                                other_check:other_check,
                                degree_u:degreeUniversity, 
                                program_starts: startProgram, 
                                thesis_starts:startThesis, 
                                thesis_end:endThesis,  
                                posterior_working:selectPosterior,
                                institution_working:InstitutionPosterior,
                                inv:comentario, 
                                file: filee, 
                                borrador:erased,
                                equipment:equipment,
                                information:information,
                                infraestructure:infraestructure,
                                other_resource:other_resource
                                };
                              //Consulta PUT
                              const requestInit = {
                                method:'PUT',
                                headers: {'Content-Type':'application/json'},
                                body: JSON.stringify(newReport)
                              }
                              fetch('http://20.151.235.246/api/a8/'+data.id, requestInit)
                              .then(res => res.json())
                              .then(res => console.log(res))
                              .then(res => console.log('hola'))
                              }

                                onClose(true);
                            

                        
    }

    






    return (
        <>
            <div className="overlay">



                <div className="formulario2">
                    <button className="boton" onClick={() => { onClose(true); setShoww(false) }}>X</button>

                    <form onSubmit={async (ev) => {
                         ev.preventDefault();
                        formFunction(ev);
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
                        <input type={archivo} name="archivo" id="archivo" onChange={e => fileChange(e)} ></input>
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
