import "./AddInv.css";
import React, { useState, useEffect } from "react";



const AddInv = ({ showadd ,onClose }) => {
   

    if (!showadd) {
        return null;
    }
    

    

    const formFunction = (ev) => {
       


                       

                        const namee = ev.target.name.value;
                        const mail = ev.target.mail.value;
                        const line = ev.target.line.value;
                        const institution = ev.target.institution.value;
                       
            
                        
                
                                let newInvestigadores = {
                                    name :namee, 
                                    mail: mail,
                                    line: line,
                                    institution: institution,
                                };
                                console.log(newInvestigadores);
                              //Consulta POST
                              const requestInit = {
                                method:'POST',
                                headers: {'Content-Type':'application/json'},
                                body: JSON.stringify(newInvestigadores)
                              }
                              fetch('http://localhost:9000/api/investigadores', requestInit)
                              .then(res => res.json())
                              .then(res => console.log(res))
                              .then(res => console.log('hola'))
                              

                                onClose(true);
                        
    }

    return (
        <>
            <div className="overlay">



                <div className="formulario2">
                    <button className="boton" onClick={() => {onClose(true)}}>X</button>
                    <h1 className="title">Agregar Investigador(a)</h1>

                    <form onSubmit={async (ev) => {
                         ev.preventDefault();
                        formFunction(ev);
                    }}>
                        <div>
            
                        <input type="text" name="name" id="name" className="autor" autoComplete="off"  placeholder="Investigator Name"/>
                        
                        </div>
                        <div>
                        <input type="text" name="mail" id="mail" className="autor" autoComplete="off"  placeholder="Mail" />
                        </div>
                        <div>
                        <input type="text" name="line" id="line" className="journal" autoComplete="off"  placeholder="Line" />
                        </div>
                        <div>
                        <input type="text" name="institution" id="institution" className="journal" autoComplete="off"  placeholder="Institution"/>
                        </div>
                     <button type="submit" >Agregar nuevo Investigador</button>
                    </form>
                </div>


            </div>


        </>
    );
}

export default AddInv;