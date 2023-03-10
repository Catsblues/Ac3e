import "./Modal.css";
import React, { useState, useEffect } from "react";



const Modal = ({ sshow, data, post ,onClose }) => {

   
    
    const [search, setSearch] = useState("");
    const [checkCoautor, setCheckCoautor] = useState("false");
    const [coauthors, setCoauthors] = useState("hidden");
    const [other, setOther] = useState("hidden");
    const [archivo, setArchivo] = useState("hidden");
    const [ins, setIns] = useState("hidden");
    
    
    const [showw, setShoww] = useState(false);

    const [resdoi, setResdoi] = useState([{
        Title:"", 
        Authors: [],
        FirstPage:"",
        LastPage:"",
        Journal:"",
        Volume:"",
        Year:""}]);



    if (!sshow) {
        return null;
    }

    const searchofdoi = async (ev) => {
        const getForDOI = async() => {
          const DOI = ev.target.value;
          await fetch('http://localhost:5000/wos?q='+ DOI)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if(!data){
              setResdoi([{
                Title:"", 
                Authors: [],
                FirstPage:"",
                LastPage:"",
                Journal:"",
                Volume:"",
                Year:""}]);
            }
            else{
              setResdoi(data);
              console.log(data.Year);
            }
          })
    
          }
      
        await getForDOI();
    
          
      }
    
      const coautorChange = (e) => {
        if(coauthors==="hidden"){
          setCoauthors("text");
        }
        else{
          setCoauthors("hidden");
        }
      }


    

    
    

    const formFunction = (ev) => {
       


        const funccion = async () => {
            const author = ev.target.autor.value;
            if(coauthors === "text"){
                var coauthor = ev.target.coautor.value}
                else{
                  var coauthor = "";
                }
            
            const title = ev.target.title.value;
            const journal = ev.target.journal.value;
            const doi = ev.target.doi.value;
            const volume = ev.target.volumen.value;
            const first = ev.target.first.value;
            const last = ev.target.last.value;
            const date = ev.target.date.value;
            const comment = ev.target.comment.value;
            
            var erased;
            if(author==="" || title==="" || journal==="0" || doi===""|| volume==="0"|| date==="" || ( coauthors==="text" && coauthor==="")){
               erased = "erased";
               
            }
            else{
               erased = "saved";
               
            }
            let newReport = {authors:author, coauthor:coauthor, articleTitle:title, journalName:journal, doi:doi, volume:volume, firstPage:first, lastPage:last, yearPublished:date, comment:comment, complete:erased}  
            const requestInit = {
              method:'PUT',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify(newReport)
            }
            await fetch('http://20.151.235.246/api/a1/'+data.id, requestInit)
            .then(res => res.json())
            .then(res => console.log(res))
            


          }
          funccion();
          onClose(true);
            
                            

                        
    }

    






    return (
        <>
            <div className="overlay">



                <div className="formulario2">
                    <button className="boton" onClick={() => { onClose(true); setShoww(false) }}>X</button>

                    <form onSubmit={async (ev) => {
                         ev.preventDefault();
                        formFunction(ev);
                    }}>
                        <span>
            
            <label >
  <span style={{color:"red", marginRight:"5px"}}>
  *
</span>
  <input type="text" name="autor" id="autor" className="titulo" autoComplete="off" placeholder="Autor(s)" defaultValue={data.authors}/>
  
  </label>
  <span className="item"><i class="fa-solid fa-circle-question">
  <p class="innerText">Format: Last Name, First name initial. (e.j., Perez, J.).
      </p >
  </i>
      
    </span>
    
  </span>
  
  
  
  <label>Any co-authors of Ac3e?</label>
  <span className="item" style={{visibility:coauthors}}><i class="fa-solid fa-circle-question">
  <div class="innerText">
  Format: Last Name, First name initial. (e.j., Perez, J.).
    </div>
  </i>
    
  </span> 
  <label >
  <span style={{color:"red", marginRight:"5px", visibility:coauthors}}>
  *
</span>
  <input type="checkbox" name="checkCoautor" id="checkCoautor" onChange={coautorChange}></input>
  </label>
  <input type={coauthors} name="coautor" id="coautor" autoComplete="off" placeholder="Coauthor(s)"></input>

<div>
<label >
  <span style={{color:"red", marginRight:"5px" }}>
  *
</span>
<input type="text" name="title" id="title" className="titulo" style={{marginRight:"10px"}} autoComplete="off" placeholder="Article Title" defaultValue={data.articleTitle}/>
</label>
<label >
  <span style={{color:"red", marginRight:"5px" }}>
  *
</span>
            <input type="text" name="journal" id="journal" className="journal" style={{marginRight:"10px"}} autoComplete="off" placeholder="Journal Name" defaultValue={data.journalName}/>
  </label>
  <label >
  <span style={{color:"red", marginRight:"5px" }}>
  *
</span>
  <input type="text" name="doi" id="doi" className="doi" autoComplete="off" placeholder="Digital Object Identifier (DOI)" defaultValue={data.doi}/>
  </label>
  
</div>
<div>
<label >
  <span style={{color:"red", marginRight:"5px"}}>
  *
</span>
            <input type="text" name="volumen" id="volumen" className="volumen" autoComplete="off" placeholder="Volume" defaultValue={data.volume}/> 
  </label>
  <input type="text" name="first" id="first" className="first" autoComplete="off" placeholder="First page" defaultValue={data.firstPage}/> 
  <input type="text" name="last" id="last" className="last" style={{marginRight:"10px"}} autoComplete="off" placeholder="Last page" defaultValue={data.lastPage} />
  <label >
  <span style={{color:"red", marginRight:"5px" }}>
  *
</span>
  <input type="text" name="publish" id="date" className="date" autoComplete="off" placeholder="Year Published" defaultValue={data.yearPublished}/>
  </label>
</div>
<div>
  <input type="text" name="comment" className="comentario" autoComplete="off" placeholder="Comment"></input>
</div>


                        <button type="submit" >Submit</button>
                    </form>
                </div>


            </div>


        </>
    );
}

export default Modal;