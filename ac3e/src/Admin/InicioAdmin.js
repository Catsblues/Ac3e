import "./InicioAdmin.css";
import Modal from "./ComponentsAdmin/Modal.js";
import ChangePass from "../Inicio/Components_Inicio/ChangePass";
import Exit from "../Login/Exit.js";
import { useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const InicioAdmin=()=> {

  const [name_researcher, setName_researcher] = useState("");
  const [show, setShow] = useState(false);
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
      else{
        setName_researcher(decodedToken.name);
      }
    }
  }, []);
  return (
    <>
    
    <div className='header'> 
      <img className="logo" src={"/ac3e.png"}/>
      <div className='usuario'>
        <h1 className="titulo1">Welcome {name_researcher} </h1>
      </div>
      <a className="statistics" href="https://app.powerbi.com/view?r=eyJrIjoiOGFhN2I3MzQtY2FlZS00YjQzLWIzNTktNTgwNDNmMWU1MTQxIiwidCI6IjAyNjI1Njc2LTMyMjctNDQwYS05YzY4LWJiNmQyOWRlNDIwNiIsImMiOjR9" target="_blank">Statistics</a>
      <button className="update" onClick={()=>setShow(true)}>Update password</button>
      <button className="exit" onClick={Exit}>Exit</button> 
    </div>
    <h1 className="title">Indicator Report</h1>
    
    <div className="modalcampos">
      {<Modal/>} 
      </div>
      < ChangePass show={show} onClose={()=>setShow(false)} name={name_researcher}/>
    </>
  );
}

export default InicioAdmin;