import React, { useState } from "react";
import ContratadorDataService from "../services/ContratadorService";

const AddContratador = () => {
  const initialContratadorState = {
    id: null,
    empresa: "",
    description: "",
  };
  const [contratador, setContratador] = useState(initialContratadorState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setContratador({ ...contratador, [name]: value });
  };

  const saveContratador = () => {
    var data = {
      empresa: contratador.empresa,
      description: contratador.description
    };

    ContratadorDataService.create(data)
      .then(response => {
        setContratador({
          id: response.data.id,
          empresa: response.data.empresa,
          description: response.data.description,
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newContratador = () => {
    setContratador(initialContratadorState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newContratador}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="empresa">Empresa</label>
            <input
              type="text"
              className="form-control"
              id="empresa"
              required
              value={contratador.empresa}
              onChange={handleInputChange}
              name="empresa"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={contratador.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveContratador} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddContratador;
