import React,{useState} from "react";
import "./Buscador.css"

const Busqueda = () => {
    const [search, setSearch] = useState("");
    const [value, setValue] = useState("default");
    const [inputsearch, setInputsearch] = useState("hidden");
    const [inputdate, setInputdate] =useState("hidden");


    const busqueda = (e) => {
        var data = JSON.parse(localStorage.getItem("data"));
        let show = [];
        for(var i = 0; i < data.lenght; i++){
            if(e.target.value==="doi"){
                if(data[i].doi===search){
                    show.push(data[i])
                }
            }
            else if(e.target.value==="autor"){
                if(data[i].autor===search){
                    show.push(data[i])
                }
            }
            else{
                if(data[i].articulo===search){
                    show.push(data[i])
                } 
            }
        }

        return show;
        
    }

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
            <label>Desea filtrar los datos?</label>
                <input type="checkbox" id="filtro" onChange={filtroChange}></input>
                <select name="selectbuscador" id="selectbuscador" defaultValue={value} onChange={handleChange}>
                    <option value="default" disabled hidden>Seleccione opción de búsqueda</option>
                    <option value="doi">Digital Object Identifier (DOI)</option>
                    <option value="autor">Autor(s)</option>
                    <option value="articulo">Article Name</option>
                    <option value="date">Upload Day</option>
                </select>
                <input type= {inputsearch} name="buscar" id="buscar" autoComplete="off" onChange={ev => setSearch(ev.target.value)} ></input>
                <input type={inputdate} name="buscardate" id="buscardate" autoComplete="off"></input>
                <button type="submit">Buscar</button>
            </div>
            </form>


            
        </div>
    );
};

export default Busqueda;