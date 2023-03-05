import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./Login/Login.js";
import Inicio from "./Inicio/Inicio.js";
import A1 from "./A1/A1.js";
import A8 from "./A8/A8.js";
import InicioAdmin from "./Admin/InicioAdmin.js";
import PlanillaInv from "./Admin/PlanillaInv.js";
import InvActivos from "./Admin/InvActivos.js";


function App() {
  
  return(
    <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}></Route>
          <Route exact path="/Inicio" element={<Inicio/>}></Route>
          <Route exact path="/Inicio/a1" element={<A1/>}></Route>
          <Route exact path="/Inicio/a8" element={<A8/>}></Route>
          <Route exact path="/InicioAdmin" element={<InicioAdmin/>}></Route>
          <Route exact path="/InicioAdmin/PlanillaInv" element={<PlanillaInv/>}></Route>
          <Route exact path="/InicioAdmin/PerfilInv" element={<InvActivos/>}></Route>
        </Routes>

    </Router>
  )
}

export default App;