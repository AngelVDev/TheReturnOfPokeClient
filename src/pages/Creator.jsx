import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPoke, getTypes } from "../redux/actions";

const Creator = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const history = useHistory();
  let [error, setError] = useState({});
  let [input, setInput] = useState({
    name: "",
    HP: "",
    attack: "",
    height: "",
    weight: "",
    defense: "",
    speed: "",
    types: [],
  });
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);
  function validateForms(input) {
    let error = {};
    if (!input.name || input.name.length < 1) {
      error.name = "Name required";
    }
    if (input.HP < 1 || input.HP > 999 || !input.HP) {
      error.HP = "HP must be above 1 and below 1000";
    }
    if (input.attack < 1 || input.attack > 999 || !input.attack) {
      error.attack = "The value must be a number above 1 and below 1000";
    }
    if (input.height < 1 || !input.height) {
      error.height = "The value must be a number above 1";
    }
    if (input.weight < 1 || !input.weight) {
      error.weight = "The value must be a number above 1";
    }
    if (input.speed < 1 || input.speed > 999 || !input.speed) {
      error.speed = "The value must be a number above 1 and below 1000";
    }
    if (input.defense < 1 || input.defense > 999 || !input.defense) {
      error.defense = "The value must be a number above 1 and below 1000";
    }
    if (input.types.length < 1 || input.types.length > 2 || !input.types) {
      error.types = "Select less than two types and at least one type";
    }
    return error;
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(validateForms({ ...input, [e.target.name]: e.target.value }));
  };
  const handleSelect = (e) => {
    if (!input.types.includes(e.target.value)) {
      setInput({
        types: [...input.types, e.target.value],
      });
    } else {
      setInput({ ...input });
    }
  };
  const handleDelete = (e) => {
    setInput({
      ...input,
      types: input.types.filter((t) => t !== e),
    });
  };

  const handleClick = () => {
    history.push("/home");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPoke(input));
    alert("GO TO THE TALL GRASS");
    setInput({
      name: "",
      HP: "",
      attack: "",
      height: "",
      weight: "",
      defense: "",
      speed: "",
      types: [],
    });
  };

  if (types) {
    return (
      <div className="creatorContainer">
        <h1>CREATE YOUR POKEMON</h1>
        <form className="formCon" onSubmit={(e) => handleSubmit(e)}>
          <label>
            NAME
            <input
              className="inputStyle"
              onChange={(e) => handleChange(e)}
              name="name"
              value={input.name}
              type="text"
            />
            {error.name && <p className="error">{error.name} </p>}
          </label>
          <label>
            HP:
            <input
              type="number"
              value={input.HP}
              name="HP"
              onChange={(e) => handleChange(e)}
            />
            {error.HP && <p>{error.HP} </p>}
          </label>

          <label>
            Attack:
            <input
              type="number"
              value={input.attack}
              name="attack"
              onChange={(e) => handleChange(e)}
            />
            {error.attack && <p>{error.attack} </p>}
          </label>

          <label>
            Height:
            <input
              type="number"
              value={input.height}
              name="height"
              onChange={(e) => handleChange(e)}
            />
            {error.height && <p>{error.height} </p>}
          </label>

          <label>
            Weight:
            <input
              type="number"
              value={input.weight}
              name="weight"
              onChange={(e) => handleChange(e)}
            />
            {error.weight && <p>{error.weight} </p>}
          </label>

          <label>
            Speed:
            <input
              type="number"
              value={input.speed}
              name="speed"
              onChange={(e) => handleChange(e)}
            />
            {error.speed && <p>{error.speed} </p>}
          </label>

          <label>
            Defense:
            <input
              type="number"
              value={input.defense}
              name="defense"
              onChange={(e) => handleChange(e)}
            />
            {error.defense && <p>{error.defense} </p>}
          </label>

          <label>
            TYPES
            <select
              className="inputStyle"
              name="types"
              onChange={(e) => handleSelect(e)}
              id="typeSelection"
            >
              <option value={null}>-</option>
              {types?.map((el) => (
                <option key={el.id} value={el.name}>
                  {el.name}
                </option>
              ))}
            </select>
            {input.types.length > 0 && (
              <div className="selectedTypes" key="selectedTypes">
                <label>Selected types:</label>
                {input.types.map((e) => (
                  <button
                    className="typeButton"
                    key={e + "Key"}
                    onClick={() => handleDelete(e)}
                  >
                    {e} x
                  </button>
                ))}
              </div>
            )}
            {error.types && <p className="error">{error.types}</p>}
          </label>
          {Object.keys(error).length || input.length > 0 ? null : (
            <button
              className="sendButton"
              disabled={Object.keys(error).length}
              // type={
              //   Object.keys(error).length || Object.keys(!error)
              //     ? "none"
              //     : "submit"
              // }
            >
              SEND
            </button>
          )}
        </form>
        <button className="backBtn" onClick={handleClick}>
          RUN
        </button>
      </div>
    );
  } else {
    return <div>NOTHING HERE, BRO</div>;
  }
};

export default Creator;
