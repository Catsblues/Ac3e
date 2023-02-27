import "./AddInv.css";
import React, { useState, useEffect } from "react";



const AddInv = ({ showadd ,onClose }) => {
   
    const [Type, setType] = useState("default");
    const [Line, setLine] = useState("default");

    if (!showadd) {
        return null}
    
    const typeChange = (ev) => {
        setType(ev.target.value)}
    
    const lineChange = (ev) => {
        setLine(ev.target.value)}

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
                                console.log(newInvestigadores);
                              //Consulta POST
                              const requestInit = {
                                method:'POST',
                                headers: {'Content-Type':'application/json'},
                                body: JSON.stringify(newInvestigadores)
                              }
                              fetch('http://20.151.235.246/api/investigadores', requestInit)
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
            
                        <select name="type" defaultValue={Type} style={{marginBottom:"10px"}} onChange={ev => typeChange(ev)}>
                            <option value="default" disabled hidden>Type</option>
                            <option value="Titular">Titular</option>
                            <option value="Asociado">Asociado</option>
                            <option value="Postdoctoral">Posdoctoral</option>
                        </select>
                        
                        </div>
                        <div>
                        <input type="text" name="mail" id="mail" className="autor" autoComplete="off"  placeholder="Mail" />
                        </div>
                        <div>
                        <select name="line" defaultValue={Line} style={{marginBottom:"10px"}} onChange={ev => lineChange(ev)}>
                            <option value="default" disabled hidden>Line</option>
                            <option value="Control">Control</option>
                            <option value="Energia">Energía</option>
                            <option value="Inteligencia Artificial">Inteligencia Artificial</option>
                            <option value="Robotica">Robótica</option>
                            <option value="Sistemas Biomedicos">Sistemas Biomédicos</option>
                            <option value="Sistemas Electricos">Sistemas Eléctricos</option>
                        </select>
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