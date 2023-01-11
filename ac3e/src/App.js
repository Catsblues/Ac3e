import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Inicio from "./Inicio/Inicio";
import A1 from "./A1/A1";

function App() {
  return(
    <Router>
        <Routes>
          <Route path="/" element={<Inicio/>}></Route>
          <Route path="/a1" element={<A1/>}></Route>
        </Routes>

    </Router>
  )
}

export default App;