import React, { useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddProyectito from "./components/AddProyectito";
import Proyectito from "./components/Proyectito";
import ProyectitoList from "./components/ProyectitoList";

import ProyectitoService from "./services/ProyectitoService";

function App() {

  useEffect(() => {
    let session_id = localStorage.getItem("session_id");
    if (!session_id) {
      ProyectitoService.initSession().then(response => {
        localStorage.setItem("session_id", response.data.result.session_id.toString())
      })
      return
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/app/proyectos.png" className="navbar-brand">
          <div className="contratador-logo" >
            <img src="/app/logo.png" alt="contratador" />
          </div>
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/app/proyectito"} className="nav-link">
              Tareas
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/app/add"} className="nav-link">
              Añadir
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/app" element={<ProyectitoList />} />
          <Route path="/app/proyectito" element={<ProyectitoList />} />
          <Route path="/app/add" element={<AddProyectito />} />
          <Route path="/app/proyectito/:id" element={<Proyectito/>} />
          <Route path="/" element={<Navigate to="/app" />} />
          <Route path="*" element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;