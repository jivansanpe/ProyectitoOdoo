import React, { useState, useEffect } from "react";
import ProyectitoDataService from "../services/ProyectitoService";

const AddProyectito = () => {
  const initialProyectitoState = {
    id: null,
    name: "",
    proyecto: "",
    user: "",
    fase: "",
    estado: ""
  };

  const [proyectos, setProyectos] = useState([]);
  const [proyectito, setProyectito] = useState(initialProyectitoState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProyectito({ ...proyectito, [name]: value });
  };

  const handleEstadoChange = event => {
    setProyectito({ ...proyectito, estado: event.target.value });
  };

  const saveProyectito = () => {
    var data = {
      name: proyectito.name,
      proyecto: proyectito.proyecto,
      user: proyectito.user,
      fase: proyectito.fase,
      estado: proyectito.estado
    };

    ProyectitoDataService.create(data)
      .then(response => {
        setProyectito({
          id: response.data.id,
          name: response.data.id,
          proyecto: response.data.proyecto,
          user: response.data.user,
          fase: response.data.fase,
          estado: response.data.estado
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newProyectito = () => {
    setProyectito(initialProyectitoState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>¡Se ha añadido con éxito!</h4>
          <button className="btn btn-success" onClick={newProyectito}>
            Añadir
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Nombre de la tarea</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={proyectito.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>
          <button onClick={saveProyectito} className="btn btn-success">
            Enviar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProyectito;
