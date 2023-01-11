import "./A1.css";
import Buscador from "./Buscador";

const A1=()=> {
    return (
      <>
      
      <div className='header'> 
        <img className="logo" src={"/ac3e.png"}/>
        <h1>A1 Isi publications</h1>
        <button className="statistics">Estadisticas</button>
      </div>
      
      <h1>Ingreso de datos</h1>
      <h2>Si desea ingresar datos rellene el formulario</h2>
      
      <div className="formulario">
        <form onSubmit={ev => {
            ev.preventDefault();
            const no = ev.target.no.value;
            const autor = ev.target.autor.value;
            const titulo = ev.target.titulo.value;
            const journal = ev.target.journal.value;
            const doi = ev.target.doi.value;
            const volumen = ev.target.volumen.value;
            const first = ev.target.first.value;
            const last = ev.target.last.value;
            const sending = ev.target.sending.value;
            const date = ev.target.date.value;
            }}>
          <div>
					  <input type="text" name="no" id="no" className="no" autocomplete="off" placeholder="No." />
            
					  <input type="text" name="autor" id="autor" className="autor" autocomplete="off" placeholder="Autor(s)"/>
          </div>
        
					  <input type="text" name="titulo" id="titulo" className="titulo" autocomplete="off" placeholder="Article Title"/>

          <div>
					  <input type="text" name="journal" id="journal" className="journal" autocomplete="off" placeholder="Journal Name"/>

            <input type="text" name="doi" id="doi" className="doi" autocomplete="off" placeholder="Digital Object Identifier (DOI)"/>
          </div>
            
            <div>
					  <input type="text" name="volumen" id="volumen" className="volumen" autocomplete="off" placeholder="Volume"/>

					  <input type="text" name="first" id="first" className="first" autocomplete="off" placeholder="First page"/>
            
					  <input type="text" name="last" id="last" className="last" autocomplete="off" placeholder="Last page"/>
            </div>
            <div>
            <label htmlFor="sending">Sending date</label>
					  <input type="date" name="sending" id="sending" className="sending"/>
            </div>

            <div>
            <label htmlFor="date">Date</label>
					  <input type="date" name="date" id="date" className="date"/>
            </div>
            <div>
            <input type="text" name="comentario" className="comentario" autocomplete="off" placeholder="Comment"></input>
            </div>
            <input type="hidden" name="validacion" id="validacion" value="true"></input>
				  
        
          <button type="submit">Enviar</button>
        </form>
      </div>

      <h1>Visualización de datos</h1>
        {<Buscador/>}     
      
      
      </>
    );
  }
  
  export default A1;