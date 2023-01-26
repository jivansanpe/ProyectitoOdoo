import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import ContratadorDataService from "../services/ContratadorService";

const Contratador = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialContratadorState = {
    id: null,
    empresa: "",
    description: "",
  };
  const [currentContratador, setCurrentContratador] = useState(initialContratadorState);
  const [message, setMessage] = useState("");

  const getContratador = id => {
    ContratadorDataService.get(id)
      .then(response => {
        setCurrentContratador(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getContratador(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentContratador({ ...currentContratador, [name]: value });
  };

  const updateContratador = () => {
    ContratadorDataService.update(currentContratador.id, currentContratador)
      .then(response => {
        setMessage("The contratador was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteContratador = () => {
    ContratadorDataService.remove(currentContratador.id)
      .then(response => {
        navigate("/app/contratador");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentContratador ? (
        <div className="edit-form">
          <h4>Contratador</h4>
          <form>
            <div className="form-group">
              <label htmlFor="empresa">Empresa</label>
              <input
                type="text"
                className="form-control"
                id="empresa"
                name="empresa"
                value={currentContratador.empresa}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentContratador.description}
                onChange={handleInputChange}
              />
            </div>

          </form>

          <button className="badge badge-danger mr-2" onClick={deleteContratador}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContratador}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Contratador...</p>
        </div>
      )}
    </div>
  );
};

export default Contratador;
