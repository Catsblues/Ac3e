import "./ChangePass.css";
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";




const ChangePass = ({ show, onClose, name}) => {

    if (!show) {
        return null;
    }
    
    const formFunction = (ev) => {
       
                        const current_pass = ev.target.current_pass.value;
                        console.log(current_pass);
                        const new_pass = ev.target.new_pass.value;
                        const confirm_pass= ev.target.confirm_pass.value;

                        const token = localStorage.getItem("token");
                        const decodedToken = jwt_decode(token);
                        console.log(decodedToken.password);
                        if (decodedToken.password !== current_pass){
                          alert("Wrong current password, please try again.");
                            return;
                        }
                        if(new_pass !== confirm_pass){
                            alert("Confirmation of your password does not match, please try again.");
                            return;
                        }
                        console.log(name);
                        const request = {
                            method:'PUT',
                            headers: {'Content-Type':'application/json'},
                            body: JSON.stringify({pass: new_pass})
                          }
                        fetch('http://20.151.235.246/api/investigadores/changepass/'+name, request)
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

                    <form onSubmit={async (ev) => {
                         ev.preventDefault();
                        formFunction(ev);
                    }}>
                        <div>
                        <label >
            
                        <input type="text" name="current_pass" id="current_pass" className="autor" autoComplete="off" placeholder="Current Password" />
                        </label>
                        </div>
                        <div>
                        <label >
          
                        <input type="text" name="new_pass" id="new_pass" className="autor" autoComplete="off" placeholder="New Password" />
                        </label>
                        </div>
                        <div>

                        <input type="text" name="confirm_pass" id="confirm_pass" className="autor" autoComplete="off"  placeholder="Confirm New Password" />
                        </div>
                        
                        


                        <button type="submit" >Submit</button>
                    </form>
                </div>


            </div>


        </>
    );
}

export default ChangePass;
