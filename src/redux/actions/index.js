import axios from "axios";

export function getPokemons() {
  return function (dispatch) {
    axios.get("/pokemons").then((response) => {
      return dispatch({
        type: "GET_POKES",
        payload: response.data,
      });
    });
  };
}
export function getTypes() {
  return async function (dispatch) {
    let json = await axios.get("/types", {});
    dispatch({ type: "GET_TYPES", payload: json.data });
  };
}
export function getQPokes(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/pokemons?name=${name}`);
      return dispatch({
        type: "GET_QUERY",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getFiltered(payload) {
  return async function (dispatch) {
    return dispatch({
      type: "GET_FILTERED",
      payload: payload,
    });
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    var json = await axios.get("/pokemons/" + id);
    dispatch({
      type: "GET_DETAIL",
      payload: json.data,
    });
  };
}
export let createPoke = (payload) => {
  return async (dispatch) => {
    try {
      let json = await axios.post("/pokemons", payload);
      return dispatch({
        type: "POST_POKE",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function orderByName(payload) {
  return async (dispatch) => {
    dispatch({
      type: "SORT_POKENAME",
      payload,
    });
  };
}
export function showCreated(payload) {
  return (dispatch) => {
    dispatch({
      type: "FILTER_SOURCE",
      payload,
    });
  };
}
export function filterByType(payload) {
  return {
    type: "FILTER_TYPES",
    payload,
  };
}
export function orderByAtk(payload) {
  return {
    type: "SORT_POKEATK",
    payload,
  };
}
export function deleteById(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/${id}/delete`);
      return dispatch({ type: "DELETE_BY_ID", payload: json.data });
    } catch (err) {
      console.log(err);
    }
  };
}
