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

    if(searchEmpresa === '') {
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
            placeholder="Search by empresa"
            value={searchEmpresa}
            onChange={onChangeSearchEmpresa}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByEmpresa}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Contratador List</h4>

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
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentContratador ? (
          <div>
            <h4>Contratador</h4>
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

            <Link
              to={"/app/contratador/" + currentContratador.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Contratador...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContratadorList;
