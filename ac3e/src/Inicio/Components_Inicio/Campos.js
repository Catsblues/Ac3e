import React from "react";
import { Link } from "react-router-dom";
import "./Campos.css"

const Campos =()=> {
    let campo = [["A1 Isi publications","a1"], ["A2 Non isi publications","a2"], ["A3 books","a3"], ["A4 awards","a4"], ["A5 organization scientific events","a5"], ["A6 participation in scientific events","a6"], ["A7 collaborative activities","a7"],["A7.1 conjoint projects","a7.1"],["A8 thesis students","a8"], ["A9 postdoctoral fellows","a9"], ["A10 outreach","a10"], ["A11 patents","a11"], ["A12 public-private conections","a12"], ["A13 Tec. and know. transfer","a13"],["A14 funding sources","a14"]]
    return(
        <>
            {
                campo.map(item=>{
                    let nombre=item[0];
                    let path="/Inicio/"+item[1];
                    return(
                        <>
                        <Link to={path} className="nameCampos"> {nombre} </Link>
                        </>
                    )
                })
            }
        </>
    )
}

export default Campos