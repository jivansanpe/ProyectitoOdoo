import axios from "axios";

const getSessionId = () => {
  return localStorage.getItem("session_id");
}

const getAll = () => {
  const session_id = getSessionId();

  const data = JSON.stringify({
    "jsonrpc": "2.0",
    "params": {
    }
  });

  const config = {
    method: 'POST',
    url: '/api/proyectito/getAll',
    headers: {
      'Content-Type': 'application/json',
      "X-Openerp-Session-Id": session_id,
    },
    data: data
  };

  return axios(config);
};

const get = id => {
  const session_id = getSessionId();

  const data = JSON.stringify({
    "jsonrpc": "2.0",
    "params": {
    }
  });

  const config = {
    method: 'POST',
    url: `/api/proyectito/get/${id}`,
    headers: {
      'Content-Type': 'application/json',
      "X-Openerp-Session-Id": session_id,
    },
    data: data
  };

  return axios(config);
};

const findByProyectito = name => {
  const session_id = getSessionId();

  const data = JSON.stringify({
    "jsonrpc": "2.0",
    "params": {
      "data": {
        "name": name
      }
    }
  });

  const config = {
    method: 'POST',
    url: `/api/proyectito/findByProyectito`,
    headers: {
      'Content-Type': 'application/json',
      "X-Openerp-Session-Id": session_id,
    },
    data: data
  };

  return axios(config);
};

const create = data => {
  const session_id = getSessionId();

  var data_to_send = JSON.stringify({
    "jsonrpc": "2.0",
    "params": {
      "data": {
        "name":data.name,
        // "proyecto": data.project_id.name,
        // "estado": data.stage_id.name,
        // "asignada":data.user_id.name,
        // 'tags':data.tag_ids, 
      }
    }
  });

  var config = {
    method: 'POST',
    url: '/api/proyectito/create',
    headers: {
      'Content-Type': 'application/json',
      "X-Openerp-Session-Id": session_id,
    },
    data: data_to_send
  };

  return axios(config);
};

const update = (id, data) => {
  const session_id = getSessionId();

  var data_to_send = JSON.stringify({
    "jsonrpc": "2.0",
    "params": {
      "data": {
        "name":data.name,
        // "proyecto": data.project_id.name,
        // "estado": data.stage_id.name,
        // "asignada":data.user_id.name,
        // 'tags':data.tag_ids, 
      }
    }
  });

  var config = {
    method: 'POST',
    url: `/api/proyectito/update/${id}`,
    headers: {
      'Content-Type': 'application/json',
      "X-Openerp-Session-Id": session_id,
    },
    data: data_to_send
  };

  return axios(config);
};

const remove = id => {
  const session_id = getSessionId();

  const data = JSON.stringify({
    "jsonrpc": "2.0",
    "params": {
    }
  });

  var config = {
    method: 'POST',
    url: `/api/proyectito/remove/${id}`,
    headers: {
      'Content-Type': 'application/json',
      "X-Openerp-Session-Id": session_id,
    },
    data: data
  };

  return axios(config);
};

const removeAll = () => {
  const session_id = getSessionId();

  const data = JSON.stringify({
    "jsonrpc": "2.0",
    "params": {
    }
  });

  var config = {
    method: 'POST',
    url: `/api/proyectito/removeAll`,
    headers: {
      'Content-Type': 'application/json',
      "X-Openerp-Session-Id": session_id,
    },
    data: data
  };

  return axios(config);
};

const initSession = () => {

  var data = JSON.stringify({
    "jsonrpc": "2.0",
    "params": {
      "db": process.env.REACT_APP_ODOO_DB,
      "login": process.env.REACT_APP_ODOO_LOGIN,
      "password": process.env.REACT_APP_ODOO_PASSWORD
    }
  });
  
  var config = {
    method: 'post',
    url: `${process.env.REACT_APP_ODOO_BASEURL}/web/session/authenticate`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios(config);
};

const ProyectitoService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByProyectito,
  initSession
};

export default ProyectitoService;