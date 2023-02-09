import "./EditarPerfil.css";
import React, { useState, useEffect } from "react";



const EditarPerfil = ({ sshow, data, post ,onClose }) => {


    

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
                              fetch('http://localhost:9000/api/investigadores/'+data.id, requestInit)
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
                    <h1 className="title">Edición de datos</h1>

                    <form onSubmit={async (ev) => {
                         ev.preventDefault();
                        formFunction(ev);
                    }}>
                        <div>
            
                        <input type="text" name="name" id="name" className="autor" autoComplete="off" defaultValue={data.name} placeholder="Investigator Name"/>
                        
                        </div>
                        <div>
            
                        <input type="text" name="type" id="type" className="autor" autoComplete="off" defaultValue={data.type} placeholder="Investigator Type"/>
                        
                        </div>
                        <div>
                        <input type="text" name="mail" id="mail" className="autor" autoComplete="off" defaultValue={data.mail} placeholder="Mail" />
                        </div>
                        <div>
                        <input type="text" name="line" id="line" className="journal" autoComplete="off" defaultValue={data.line} placeholder="Line" />
                        </div>
                        <div>
                        <input type="text" name="institution" id="institution" className="journal" autoComplete="off"  defaultValue={data.institution} placeholder="Institution"/>
                        </div>
                     <button type="submit" >Actualizar datos</button>
                    </form>
                </div>


            </div>


        </>
    );
}

export default EditarPerfil;