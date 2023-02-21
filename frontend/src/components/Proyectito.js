import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import  ProyectitoDataService from "../services/ProyectitoService";
import { Link } from 'react-router-dom';
const Proyectito = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialProyectitoState = {
    id: null,
    name:"",
    proyecto: "",
    user:"",
    estado:""
    
  };
  const [currentProyectito, setCurrentProyectito] = useState(initialProyectitoState);
  const [message, setMessage] = useState("");

  const getProyectito = id => {
    ProyectitoDataService.get(id)
      .then(response => {
        setCurrentProyectito(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getProyectito(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentProyectito({ ...currentProyectito, [name]: value });
  };

  const updateProyectito = () => {
    ProyectitoDataService.update(currentProyectito.id, currentProyectito)
      .then(response => {
        setMessage("¡Tarea actualizada con éxito!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteProyectito = () => {
    ProyectitoDataService.remove(currentProyectito.id)
      .then(response => {
        navigate("/app/proyectito");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentProyectito ? (
        <div className="edit-form">
          <h4>Proyectito</h4>
          <form>
          <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentProyectito.name}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteProyectito}>
            Eliminar
          </button>

          <button
          type="submit"
          className="badge badge-success"
          onClick={updateProyectito}>
          <Link to={`/app/proyectito`}>Actualizar</Link>
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Selecciona una tarea para ver más detalles...</p>
        </div>
      )}
    </div>
  );
};

export default Proyectito;