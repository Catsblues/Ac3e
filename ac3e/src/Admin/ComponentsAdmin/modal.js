import React from "react";
import { Link } from "react-router-dom";
import "./modal.css"

const modal =()=> {
    let menu = [["Planilla General","PlanillaGen"],["Investigadores","PlanillaInv"],["Estadísticas"]]
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