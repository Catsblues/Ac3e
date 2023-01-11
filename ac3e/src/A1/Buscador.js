import {useState} from "react";
import "./Buscador.css"

const Busqueda = () => {
    const [search, setSearch] = useState("");
    const [value, setValue] = useState("default");
    const [inputsearch, setInputsearch] = useState("hidden");
    const [inputdate, setInputdate] =useState("hidden");


    

    const handleChange = (e) => {
        setValue(e.target.value);
    }
    const optionChange = (e) => {
        if(e.target.value==="sending" || e.target.value==="date"){
            setInputdate("date");
            setInputsearch("hidden")
        }
        else{setInputsearch("text");
            setInputdate("hidden")}
    }

    return (
        <div className="buscador">
            <form onSubmit={ev => {ev.preventDefault();setSearch(ev.target.search.value)}} onChange={optionChange}>
            <div>
                <select name="selectbuscador" id="selectbuscador" defaultValue={value} onChange={handleChange}>
                    <option value="default" disabled hidden>Seleccione opción de búsqueda</option>
                    <option value="No.">No.</option>
                    <option value="Autor">Autor(s)</option>
                    <option value="Articulo">Article Name</option>
                    <option value="Journal">Journal Name</option>
                    <option value="doi">Digital Object Identifier (DOI)</option>
                    <option value="sending">Sending date</option>
                    <option value="date">Date</option>
                </select>
                <input type= {inputsearch} name="buscar" id="buscar" autoComplete="off" onChange={ev => setSearch(ev.target.value)} ></input>
                <input type={inputdate} name="buscardate" id="buscardate" autoComplete="off"></input>
                <button type="submit">Buscar</button>
            </div>
                <p>Resultado para: {search}</p>
            </form>
        </div>
    );
};

export default Busqueda;