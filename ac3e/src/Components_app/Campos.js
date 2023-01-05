import "./Campos.css"

const Campos =()=> {
    let campo = ["A1 Isi publications", "A2 Non isi publications", "A3 books", "A4 awards", "A5 organization scientific events", "A6 participation in scientific events", "A7 collaborative activities","A7.1 conjoint projects","A8 thesis students", "A9 postdoctoral fellows", "A10 outreach", "A11 patents", "A12 public-private conections", "A13 Tec. and know. transfer","A14 funding sources"]
    return(
        <>
            {
                campo.map(item=>{
                    return(
                        <>
                        <h1 className="nameCampos"> {item} </h1>
                        </>
                    )
                })
            }
        </>
    )
}

export default Campos