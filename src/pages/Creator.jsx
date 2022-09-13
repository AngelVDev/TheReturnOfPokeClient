import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPoke, getTypes } from "../redux/actions";
import colors from "../styles/colors";
import colorsAux from "../styles/colorsAux";
function validateForms(input) {
  let error = {};
  const regex = new RegExp(/(https?:\/\/.*\.(?:png))/i);

  if (!input.name.length || input.name.length < 1 || input.name.length > 12) {
    error.name = "Name required (Max of 12 characters)";
  }
  if (input.image.length && regex.test(input.image) === false) {
    error.image = "Format your image to PNG, preferably without background";
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
  if (input.defense < 1 || input.defense > 999 || !input.defense) {
    error.defense = "The value must be a number above 1 and below 1000";
  }
  if (input.speed < 1 || input.speed > 999 || !input.speed) {
    error.speed = "The value must be a number above 1 and below 1000";
  }
  if (
    input.types.length === 0 ||
    input.types.length > 2 ||
    !input.types.length
  ) {
    error.types = "Select less than two types and at least one type";
  }
  return error;
}

const bGcolour = (poketypen) => {
  if (colors.hasOwnProperty(poketypen)) {
    return { backgroundColor: colors[poketypen] };
  }
};
const typeImg = (pokeimg) => {
  if (colorsAux.hasOwnProperty(pokeimg)) {
    return colorsAux[pokeimg];
  }
};

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
    image: "",
    weight: "",
    defense: "",
    speed: "",
    types: [],
  });
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(validateForms({ ...input, [e.target.name]: e.target.value }));
  };
  const handleSelect = (e) => {
    setInput({ ...input, types: [...input.types, e.target.value] });
    setError(
      validateForms({ ...input, types: [...input.types, e.target.value] })
    );
  };
  const handleDelete = (e) => {
    setInput({
      ...input,
      types: input.types.filter((t) => t !== e),
    });
    setError(
      validateForms({
        ...input,
        types: input.types.filter((t) => t !== e),
      })
    );
  };

  const handleClick = () => {
    history.push("/home");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(error).length || input === undefined) {
      alert("Please fix or fill the fields");
    } else {
      dispatch(createPoke(input));
      setInput({
        name: "",
        HP: "",
        attack: "",
        height: "",
        weight: "",
        defense: "",
        speed: "",
        image: "",
        types: [],
      });
      alert("POKEMON CREATED SUCCESFULLY");
    }
  };

  if (types) {
    return (
      <div className="creatorContainer">
        <h1 className="creatorTitle">CREATE YOUR POKEMON</h1>
        {/* <pre>{JSON.stringify(input)}</pre> */}
        <form className="formCon" onSubmit={(e) => handleSubmit(e)}>
          <label>
            NAME
            <input
              className="inputStyle"
              onChange={(e) => handleChange(e)}
              name="name"
              value={input.name}
              required
              type="text"
            />
            {error.name && <p className="error">{error.name} </p>}
          </label>
          <label>
            IMAGE
            <input
              className="inputStyle"
              onChange={(e) => handleChange(e)}
              name="image"
              value={input.image}
              type="text"
            />
            {error.image && <p className="error">{error.image} </p>}
          </label>
          <label>
            HP:
            <input
              className="inputStyle"
              type="number"
              value={input.HP}
              required
              name="HP"
              onChange={(e) => handleChange(e)}
            />
            {error.HP && <p className="error">{error.HP} </p>}
          </label>

          <label>
            Attack:
            <input
              className="inputStyle"
              type="number"
              required
              value={input.attack}
              name="attack"
              onChange={(e) => handleChange(e)}
            />
            {error.attack && <p className="error">{error.attack} </p>}
          </label>

          <label>
            Height:
            <input
              className="inputStyle"
              type="number"
              value={input.height}
              name="height"
              required
              onChange={(e) => handleChange(e)}
            />
            {error.height && <p className="error">{error.height} </p>}
          </label>

          <label>
            Weight:
            <input
              className="inputStyle"
              type="number"
              value={input.weight}
              name="weight"
              required
              onChange={(e) => handleChange(e)}
            />
            {error.weight && <p className="error">{error.weight} </p>}
          </label>

          <label>
            Speed:
            <input
              className="inputStyle"
              type="number"
              value={input.speed}
              name="speed"
              onChange={(e) => handleChange(e)}
              required
            />
            {error.speed && <p className="error">{error.speed} </p>}
          </label>

          <label>
            Defense:
            <input
              className="inputStyle"
              type="number"
              value={input.defense}
              name="defense"
              onChange={(e) => handleChange(e)}
              required
            />
            {error.defense && <p className="error">{error.defense} </p>}
          </label>

          <label>
            TYPES:
            <select
              className="inputStyle"
              name="types"
              onChange={(e) => handleSelect(e)}
              id="typeSelection"
              required
            >
              {types.length ? (
                types.map((el) => (
                  <option style={bGcolour(el.name)} key={el.id} value={el.name}>
                    {el.name.toUpperCase()}
                  </option>
                ))
              ) : (
                <option>Loading...</option>
              )}
            </select>
            {input.types.length > 0 && (
              <div className="selectedTypes" key="selectedTypes">
                <label>Your selection:</label>
                {input.types.map((e) => (
                  <button
                    className="typeButton"
                    key={e + "Key"}
                    onClick={() => handleDelete(e)}
                  >
                    {
                      <img
                        src={typeImg(e)}
                        style={{ marginRight: "0.5vw", height: "23px" }}
                        alt={e}
                      />
                    }{" "}
                    x
                  </button>
                ))}
              </div>
            )}
            {error.types && <p className="error">{error.types}</p>}
          </label>
          {Object.keys(error).length || !input ? null : (
            <button className="sendButton" disabled={Object.keys(error).length}>
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
