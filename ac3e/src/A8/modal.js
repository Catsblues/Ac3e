import "./modal.css";
import React, { useState, useEffect } from "react";



const modal = ({ sshow, data, onClose }) => {

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

    const [showw, setShoww] = useState(false);


    

    if (!sshow) {
        return null;
    }
    const id = data[0];
    console.log(data[10]);
    const handleGenderChange = (e) => {
        console.log(e.target.value);
        setGender(e.target.value)

    }



    const handleStatusChange = (e) => {

        setThesisStatus(e.target.value)
        if (e.target.value === "2") {
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
        if (coautors === "hidden") {
            setCoautors("text");
        }
        else {
            setCoautors("hidden");
        }
    }

    const otherChange = (e) => {
        if (other === "hidden") {
            setOther("text");
        }
        else {
            setOther("hidden");
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

   




    const compare = (reportA, reportB) => {
        var Akeys = Object.keys(reportA);
        var Bkeys = Object.keys(reportB);

        if (Akeys.join("") !== Bkeys.join("")) {
            return false;
        }
        for (var i = 0; i < Akeys.length; i++) {
            if (reportA[Akeys[i]] !== reportB[Bkeys[i]]) {
                return false;
            }
        }
        return true;
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
                        const filee = "";


                        if(selectAcademic === "4"){
                                //Consulta PUT profesional title

                            let newReport1 = {name :name, run: run, gender : gender, mail: mail, thesis_status :selectThesis, title:title, academic_degree: "1", degree_domination: denomination, tutor:tutor, cotutor:coautor, other:other, degree_u:degreeUniversity, program_starts: startProgram, thesis_starts:startThesis, thesis_end:endThesis, resourse_center:selectResource, posterior_working:selectPosterior,institution_working:InstitutionPosterior,inv:comentario, file: filee}
                            const requestInit1 = {
                                method:'PUT',
                                headers: {'Content-Type':'application/json'},
                                body: JSON.stringify(newReport1)
                              }
                              fetch('http://localhost:9000/api/'+id, requestInit1)
                              .then(res => res.json())
                              .then(res => console.log(res))
                              .then(res => console.log('hola'))
                              //Consulta PUT master
                              let newReport2 = {name :name, run: run, gender : gender, mail: mail, thesis_status :selectThesis, title:title, academic_degree: "2", degree_domination: denomination, tutor:tutor, cotutor:coautor, other:other, degree_u:degreeUniversity, program_starts: startProgram, thesis_starts:startThesis, thesis_end:endThesis, resourse_center:selectResource, posterior_working:selectPosterior,institution_working:InstitutionPosterior,inv:comentario, file: filee}
                              const requestInit2 = {
                                method:'PUT',
                                headers: {'Content-Type':'application/json'},
                                body: JSON.stringify(newReport2)
                              }
                              fetch('http://localhost:9000/api/'+id, requestInit2)
                              .then(res => res.json())
                              .then(res => console.log(res))
                              .then(res => console.log('hola'))
                              }
                              else{
                                let newReport = {name :name, run: run, gender : gender, mail: mail, thesis_status :selectThesis, title:title, academic_degree: selectAcademic, degree_domination: denomination, tutor:tutor, cotutor:coautor, other:other, degree_u:degreeUniversity, program_starts: startProgram, thesis_starts:startThesis, thesis_end:endThesis, resourse_center:selectResource, posterior_working:selectPosterior,institution_working:InstitutionPosterior,inv:comentario, file: filee};
                              //Consulta PUT
                              const requestInit = {
                                method:'PUT',
                                headers: {'Content-Type':'application/json'},
                                body: JSON.stringify(newReport)
                              }
                              fetch('http://localhost:9000/api/'+id, requestInit)
                              .then(res => res.json())
                              .then(res => console.log(res))
                              .then(res => console.log('hola'))
                              }

                              window.location.reload();
                            

                        
    }

    






    return (
        <>
            <div className="overlay">



                <div className="formulario2">
                    <button className="boton" onClick={() => { onClose(true); setShoww(false) }}>X</button>
                    <h1 className="title">Edición de datos</h1>

                    <form onSubmit={async (ev) => {
                         ev.preventDefault();
                        formFunction(ev);
                    }}>
                        <div>
                        <input type="text" name="name" id="name" className="autor" autoComplete="off" defaultValue={data[1]} placeholder="Student Name" />
                        <span className="item"><i class="fa-solid fa-circle-question"></i>
                            <div class="innerText">
                                First name and last name.
                            </div>
                        </span>
                        </div>
                        <div>
                        <input type="text" name="run" id="run" className="titulo" autoComplete="off" defaulValue={data[2]} placeholder="Run o Passport" />
                        <span className="item"><i class="fa-solid fa-circle-question"></i>
                            <div class="innerText">
                                Writing without point and with script
                            </div>
                        </span>
                        </div>
                        <div>
                        <select name="selectbuscador" id="selectbuscador" defaultValue={data[3]} onChange={e => handleGenderChange(e)}>
                            <option value='0' disabled hidden>Gender</option>
                            <option value='1'>Femenino</option>
                            <option value='2'>Masculino</option>
                        </select>

                        <input type="text" name="mail" id="mail" className="journal" autoComplete="off" defaultValue={data[4]} placeholder="mail" />
                        </div>
                        <div>
                        <input type="text" name="title" id="title" className="journal" autoComplete="off"  defaultValue={data[6]} placeholder="Thesis Title" />
                        </div>
                        <div>
                        <select name="selectAcademic" id="selectAcademic" defaultValue={data[7]} onChange={e => handleAcademicChange(e)}>
                            <option value="0" disabled hidden>Academic Degree</option>
                            <option value="1">Undergraduate degree or profesional title</option>
                            <option value="2">Master o equivalent</option>
                            <option value="3">PhD degree</option>
                            <option value="4">Profesional Title and Master</option>
                        </select>

                        <input type="text" name="denomination" id="denomination" className="journal" autoComplete="off" defaultValue={data[8]} placeholder="Degree Denomination" />
                        </div>
                        <div>
                        <input type="text" name="tutor" id="tutor" className="journal" autoComplete="off" defaultValue={data[9]} placeholder="Tutor" />
                        <span className="item"><i class="fa-solid fa-circle-question"></i>
                            <div class="innerText">
                                Last name followed by "," and first name initial.
                            </div>
                        </span>
                        <input type="text" name="tutorInstitution" id="tutorInstitution" className="journal" defaultValue={data[21]} autoComplete="off" placeholder="Tutor Intitution" />
                        </div>
                        <div>
                        <label>Co-autor?</label>
                        <input type="checkbox" name="checkCoautor" id="checkCoautor" onChange={coautorChange}></input>
                        <input type={coautors} name="coautor" id="coautor" defaultValue={data[10]} autoComplete="off" placeholder="Co-Tutor"></input>
                        <input type={coautors} name="coautorInstitution" id="coautorInstitution" autoComplete="off" defaultValue={data[22]} placeholder="Co-Tutor's Institution"></input>
                        </div>
                        <div>
                        <label>Other?</label>
                        <input type="checkbox" name="checkOther" id="checkOther" onChange={otherChange}></input>
                        <input type={other} name="other" id="other" autoComplete="off" defaultValue={data[11]} placeholder="Other"></input>
                        <input type={other} name="otherInstitution" id="otherInstitution" autoComplete="off"defaultValue={data[23]}  placeholder="Other's Institution"></input>
                        </div>
                        <div>
                        <input type="text" name="degreeUniversity" id="degreeUniversity" className="journal" defaultValue={data[12]} autoComplete="off" placeholder="University that gives the degree" />
                        </div>
                        <div>
                        <input type="text" name="startProgram" id="startProgram" className="journal" defaultValue={data[13]} autoComplete="off" placeholder="Year student starts program" />
                        <input type="text" name="startThesis" id="startThesis" className="journal" defaultValue={data[14]} autoComplete="off" placeholder="Year student starts thesis" />
                        <input type="text" name="endThesis" id="endThesis" className="journal"defaultValue={data[15]}  autoComplete="off" placeholder="Year student end thesis" />
                        </div>
                        <div>
                        <select name="selectResource" id="selectResource" defaultValue={data[16]} onChange={e => handleResourceChange(e)}>
                            <option value="0" disabled hidden>Resources provide by the center</option>
                            <option value="1">Equipment</option>
                            <option value="2">Information</option>
                            <option value="3">Infraestructure</option>
                            <option value="4">Other</option>
                        </select>
                        </div>


                        <div>
                        <select name="selectThesis" id="selectThesis" defaultValue={data[5]} onChange={e => handleStatusChange(e)}>
                            <option value="0" disabled hidden>Thesis Status</option>
                            <option value="1">In Progress</option>
                            <option value="2">Finished</option>
                        </select>
                        </div>
                        <div>
                        <input type={archivo} name="archivo" id="archivo" onChange={e => fileChange(e)} ></input>
                        <span className="item"><i class="fa-solid fa-circle-question"></i>
                            <div class="innerText" style={{visibility:posteriorSelect}}>
                                Only pdf, if it weighs more than 20 megabytes attach pdf with cover, index and abstract.
                            </div>
                        </span>

                        <select name="selectPosterior" id="selectPosterior" style={{ visibility: posteriorSelect }} defaultValue={data[17]} onChange={e => handlePosteriorChange(e)}>
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

                        <input type={ins} name="InstitutionPosterior" id="InstitutionPosterior" defaultValue={data[18]} className="journal" autoComplete="off" placeholder="Institution of Posterior working area" />
                        <span className="item"><i class="fa-solid fa-circle-question"></i>
                            <div class="innerText" style={{visibility:posteriorSelect}}>
                                Institute where it is inserted. If you are unemployed indicate.
                            </div>
                        </span>
                        </div>

                        <div>
                            <input type="text" name="comentario" className="comentario" autoComplete="off" defalutValue={data[19]} placeholder="Comment"></input>
                        </div>


                        <button type="submit" >Enviar</button>
                    </form>
                </div>


            </div>


        </>
    );
}

export default modal;