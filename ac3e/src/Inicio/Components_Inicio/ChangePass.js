import "./ChangePass.css";
import React, { useState, useEffect } from "react";



const Modal = ({ sshow, data, post ,onClose }) => {



    if (!sshow) {
        return null;
    }
    
    
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
                        <input type="text" name="current" id="current" className="autor" autoComplete="off" placeholder="Current Password" />
                        </label>
                        </div>
                        <div>
                        <label >
            <span style={{color:"red", marginRight:"5px"}}>
            *
          </span>
                        <input type="text" name="new" id="new" className="autor" autoComplete="off" placeholder="New Password" />
                        </label>
                        </div>
                        <div>

                        <input type="text" name="confirm" id="confirm" className="autor" autoComplete="off"  placeholder="Confirm New Password" />
                        </div>
                        
                        


                        <button type="submit" >Submit</button>
                    </form>
                </div>


            </div>


        </>
    );
}

export default Modal;
