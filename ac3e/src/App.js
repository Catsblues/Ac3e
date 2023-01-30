import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./Login/Login";
import Inicio from "./Inicio/Inicio";
import A1 from "./A1/A1";
import InicioAdmin from "./Admin/InicioAdmin";
import PlanillaInv from "./Admin/PlanillaInv";
import EditarPerfil from "./Admin/EditarPerfil";
import PlanillaGen from "./Admin/PlanillaGen";
import A8 from "./A8/A8";

function App() {
  
  return(
    <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}></Route>
          <Route exact path="/Inicio" element={<Inicio/>}></Route>
          <Route exact path="/Inicio/a1" element={<A1/>}></Route>
          <Route exact path="/Inicio/a8" element={<A8/>}></Route>
          <Route exact path="/InicioAdmin" element={<InicioAdmin/>}></Route>
          <Route exact path="/InicioAdmin/PlanillaGen" element={<PlanillaGen/>}></Route>
          <Route exact path="/InicioAdmin/PlanillaInv" element={<PlanillaInv/>}></Route>
          <Route exact path="/PlanillaInv/EditarPerfil" element={<EditarPerfil/>}></Route>
        </Routes>

    </Router>
  )
}

export default App;