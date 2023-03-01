import "./EditarPerfil.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";


const EditarPerfil = ({ sshow, data, post ,onClose }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
        }
        else{
          const decodedToken = jwt_decode(token);
          if (decodedToken.rol !== "admin") {
            navigate("/inicio");
          }
        }
      }, []);
    

    if (!sshow) {
        return null;
    }

    

    
       
    
    const formFunction = (ev) => {
       


                       

                        const namee = ev.target.name.value;
                        const type = ev.target.type.value;
                        const mail = ev.target.mail.value;
                        const line = ev.target.line.value;
                        const institution = ev.target.institution.value;
                       
            
                        
                
                                let newInvestigadores = {
                                    name :namee,
                                    type: type,
                                    mail: mail,
                                    line: line,
                                    institution: institution,
                                };
                              //Consulta PUT
                              const requestInit = {
                                method:'PUT',
                                headers: {'Content-Type':'application/json'},
                                body: JSON.stringify(newInvestigadores)
                              }
                              fetch('http://20.151.235.246/api/investigadores/'+data.id, requestInit)
                              .then(res => res.json())
                              .then(res => console.log(res))
                              .then(res => console.log('hola'))
                              

                                onClose(true);
                            

                        
    }

    return (
        <>
            <div className="overlay">



                <div className="formulario2">
                    <button className="boton" onClick={() => { onClose(true) }}>X</button>
                    <h1 className="title">Edit profile</h1>

                    <form onSubmit={async (ev) => {
                         ev.preventDefault();
                        formFunction(ev);
                    }}>
                        <div>
            
                        <input type="text" name="name" id="name" className="autor" autoComplete="off" defaultValue={data.name} placeholder="Investigator Name"/>
                        
                        </div>
                        <div>
            
                        <select name="type" style={{marginBottom:"10px"}} defaultValue={data.type}>
                            <option value="default" disabled hidden>Type</option>
                            <option value="Holder">Holder</option>
                            <option value="Associated">Associated</option>
                            <option value="Post-doctoral">Post-doctoral</option>
                        </select>
                        
                        </div>
                        <div>
                        <input type="text" name="mail" id="mail" className="autor" autoComplete="off" defaultValue={data.mail} placeholder="Mail" />
                        </div>
                        <div>
                        <select name="line" style={{marginBottom:"10px"}} defaultValue={data.line}>
                            <option value="default" disabled hidden>Line</option>
                            <option value="Control">Control</option>
                            <option value="Energy">Energy</option>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                            <option value="Robotica">Robotica</option>
                            <option value="Sistemas Biomedicos">Biomedical Systems</option>
                            <option value="Sistemas Electricos">Electrical Systems</option>
                        </select>
                        </div>
                        <div>
                        <input type="text" name="institution" id="institution" className="journal" autoComplete="off"  defaultValue={data.institution} placeholder="Institution"/>
                        </div>
                     <button type="submit" >Update</button>
                    </form>
                </div>


            </div>


        </>
    );
}

export default EditarPerfil;