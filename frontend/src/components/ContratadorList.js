import React, { useState, useEffect } from "react";
import ContratadorDataService from "../services/ContratadorService";
import { Link } from "react-router-dom";

const ContratadorList = () => {
  const [contratador, setContratador] = useState([]);
  const [currentContratador, setCurrentContratador] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchEmpresa, setSearchEmpresa] = useState("");

  useEffect(() => {
    retrieveContratador();
  }, []);

  const onChangeSearchEmpresa = e => {
    const searchEmpresa = e.target.value;
    setSearchEmpresa(searchEmpresa);
  };

  const retrieveContratador = () => {
    ContratadorDataService.getAll()
      .then(response => {
        setContratador(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveContratador();
    setCurrentContratador(null);
    setCurrentIndex(-1);
  };

  const setActiveContratador = (contratador, index) => {
    setCurrentContratador(contratador);
    setCurrentIndex(index);
  };

  const removeAllContratador = () => {
    ContratadorDataService.removeAll()
      .then(response => {
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByEmpresa = () => {

    if (searchEmpresa === '') {
      refreshList();
      return;
    }

    ContratadorDataService.findByEmpresa(searchEmpresa)
      .then(response => {
        setContratador(response.data.result.response);
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
            placeholder="Busca por nombre de empresa"
            value={searchEmpresa}
            onChange={onChangeSearchEmpresa}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByEmpresa}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Lista de contratos</h4>

        <ul className="list-group">
          {contratador &&
            contratador.map((contratador, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveContratador(contratador, index)}
                key={index}
              >
                {contratador.empresa}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllContratador}
        >
          Limpiar todo
        </button>
      </div>
      <div className="col-md-6">
        {currentContratador ? (
          <div>
            <h4>Contratador</h4>
            <div>
              <label>
                <strong>Número de contrato:</strong>
              </label>{" "}
              {currentContratador.name}
            </div>
            <div>
              <label>
                <strong>Empresa:</strong>
              </label>{" "}
              {currentContratador.empresa}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentContratador.description}
            </div>
            <div>
              <label>
                <strong>Horas:</strong>
              </label>{" "}
              {currentContratador.horas}
            </div>
            <div>
              <label>
                <strong>Pago por hora:</strong>
              </label>{" "}
              {currentContratador.pago_por_hora}
            </div>
            <Link
              to={"/app/contratador/" + currentContratador.id}
              className="badge badge-warning"
            >
              Editar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Por favor, haz click en un contrato...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContratadorList;
