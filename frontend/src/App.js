import React, { useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddContratador from "./components/AddContratador";
import Contratador from "./components/Contratador";
import ContratadorList from "./components/ContratadorList";

import ContratadorService from "./services/ContratadorService";

function App() {

  useEffect(() => {
    let session_id = localStorage.getItem("session_id");
    if (!session_id) {
      ContratadorService.initSession().then(response => {
        localStorage.setItem("session_id", response.data.result.session_id.toString())
      })
      return
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/app/contratador" className="navbar-brand">
          <div className="contratador-logo" >
            <img src="/app/contratador-logo.jpg" alt="Contratador" />
          </div>
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/app/contratador"} className="nav-link">
              Contratador
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/app/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/app" element={<ContratadorList />} />
          <Route path="/app/contratador" element={<ContratadorList />} />
          <Route path="/app/add" element={<AddContratador />} />
          <Route path="/app/contratador/:id" element={<Contratador />} />
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
