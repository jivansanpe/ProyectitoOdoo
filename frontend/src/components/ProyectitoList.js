import React, { useState, useEffect } from "react";
import ProyectitoDataService from "../services/ProyectitoService";
import { Link } from "react-router-dom";

const ProyectitoList = () => {
  const [proyectito, setProyectito] = useState([]);
  const [currentProyectito, setCurrentProyectito] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchProyectito, setSearchProyectito] = useState("");

  useEffect(() => {
    retrieveProyectito();
  }, []);

  const onChangeSearchProyectito = e => {
    const searchProyectito = e.target.value;
    setSearchProyectito(searchProyectito);
  };

  const retrieveProyectito = () => {
    ProyectitoDataService.getAll()
      .then(response => {
        setProyectito(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveProyectito();
    setCurrentProyectito(null);
    setCurrentIndex(-1);
  };

  const setActiveProyectito = (proyectito, index) => {
    setCurrentProyectito(proyectito);
    setCurrentIndex(index);
  };

  const removeAllProyectito = () => {
    ProyectitoDataService.removeAll()
      .then(response => {
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByProyectito = () => {

    if (searchProyectito === '') {
      refreshList();
      return;
    }

    ProyectitoDataService.findByProyectito(searchProyectito)
      .then(response => {
        setProyectito(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Introduce el nombre de una tarea"
            value={searchProyectito}
            onChange={onChangeSearchProyectito}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByProyectito}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Tareas</h4>

        <ul className="list-group">
          {proyectito &&
            proyectito.map((proyectito, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveProyectito(proyectito, index)}
                key={index}
              >
                {proyectito.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllProyectito}
        >
          Borrar todo
        </button>
      </div>
      <div className="col-md-6">
        {currentProyectito ? (
          <div>
            <h4>Datos</h4>
            <div>
              <label>
                <strong>Nombre:</strong>
              </label>{" "}
              {currentProyectito.name}
            </div>
            <div>
              <label>
                <strong>Proyecto asociado:</strong>
              </label>{" "}
              {currentProyectito.proyecto}
            </div>
            <div>
              <label>
                <strong>Encargado a:</strong>
              </label>{" "}
              {currentProyectito.user}
            </div>
            <div>
              <label>
                <strong>Fase:</strong>
              </label>{" "}
              {currentProyectito.fase}
            </div>
            <div>
              <label>
                <strong>Estado:</strong>
              </label>{" "}
              {currentProyectito.estado}
            </div>


            <Link
              to={"/app/proyectito/" + currentProyectito.id}
              className="badge badge-warning"
            >
              Editar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Selecciona una tarea para ver más detalles...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProyectitoList;