import React from "react";
import { Link } from "react-router-dom";
import "./Modal.css"

const modal =()=> {
    let menu = [["General","PlanillaGen"],["Researcher","PlanillaInv"],["Research profile","PerfilInv"]]
    return(
        <>
            {
                menu.map(item=>{
                    let nombre=item[0];
                    let path="/InicioAdmin/"+item[1];
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

export default modal;
