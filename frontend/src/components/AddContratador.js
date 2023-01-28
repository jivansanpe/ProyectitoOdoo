import React, { useState } from "react";
import ContratadorDataService from "../services/ContratadorService";

const AddContratador = () => {
  const initialContratadorState = {
    id: null,
    name: "",
    empresa: "",
    description: "",
    horas: "",
    pago_por_hora: ""
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
      name: contratador.name,
      description: contratador.description,
      horas: contratador.horas,
      pago_por_hora: contratador.pago_por_hora
    };

    ContratadorDataService.create(data)
      .then(response => {
        setContratador({
          id: response.data.id,
          name: response.data.name,
          empresa: response.data.empresa,
          description: response.data.description,
          horas: response.data.horas,
          pago_por_hora: response.data.pago_por_hora
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
          <h4>¡Contrato creado con éxito!</h4>
          <button className="btn btn-success" onClick={newContratador}>
            Crear
          </button>
        </div>
      ) : (
        <div>

          <div className="form-group">
            <label htmlFor="name">Número de contrato:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={contratador.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

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

          <div className="form-group">
            <label htmlFor="horas">Horas</label>
            <input
              type="text"
              className="form-control"
              id="horas"
              required
              value={contratador.horas}
              onChange={handleInputChange}
              name="horas"
            />
          </div>

          <div className="form-group">
            <label htmlFor="pago_por_hora">Pago por hora</label>
            <input
              type="text"
              className="form-control"
              id="pago_por_hora"
              required
              value={contratador.pago_por_hora}
              onChange={handleInputChange}
              name="pago_por_hora"
            />
          </div>

          <button onClick={saveContratador} className="btn btn-success">
            Confirmar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddContratador;
