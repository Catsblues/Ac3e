import "./EditarPerfil.css";
import React, {useState} from "react";

const EditarPerfil = () => {

    const [value, setValue] = useState("default");

    const handleChange = (e) => {
        setValue(e.target.value);
    }
    
  return (
    <>
    <div className='header'> 
      <img className="logo" src={"/ac3e.png"}/>
    </div>
    <div className='contenedor'>
    <p className="titleform">Bienvenido</p>
    </div>
    <form className="formulario1" onSubmit={ev => {
            ev.preventDefault();

            const name = ev.target.name.value;
            const mail = ev.target.mail.value;
            const line = ev.target.line.value;
            const university = ev.target.university.value; 

            }}>
            <div>
                <label>Nombre Completo</label>
				<input type="text" name="name" id="name"  className="name" autoComplete="on"/>
            </div>
            <div>
                <label>Correo</label>
				<input type="text" name="mail" id="mail" className="mail" autoComplete="on"/>
            </div>
            <div>
                <label>Linea de investigación</label>
				<select name="selectcampo" id="selectcampo" defaultValue={value} onChange={handleChange}>
                    <option value="default" disabled hidden>Seleccione</option>
                    <option value="Control">Control y Automatización</option>
                    <option value="Energía">Energías Renovables y Conversión de Potencia</option>
                    <option value="Inteligencia Artificial">Inteligencia Artificial y Análisis de Datos</option>
                    <option value="Robótica">Robótica</option>
                    <option value="Biomédicos">Sistemas Biomédicos</option>
                    <option value="Eléctricos">Sistemas Eléctricos</option>
                </select>
            </div>
            <div>
                <label>Universidad</label>
				<input type="text" name="university" id="university" className="university" autoComplete="on"/>
            </div>
          <button type="submit">Actualizar los datos</button>
        </form>
      

    </>
  );

}

export default EditarPerfil;