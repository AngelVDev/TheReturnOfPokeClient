import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loader from "./Loader";
import { clear, deleteById, getDetails } from "../redux/actions";
import { missingno } from "../components/Cards";
import "../styles/pages.css";
import colors from "../styles/colors.js";
import colorsAux from "../styles/colorsAux.js";

const Details = ({ match }) => {
  const dispatch = useDispatch();
  const { id } = match.params;
  const history = useHistory();
  const poke = useSelector((state) => state.pokeDetail);
  const regex = new RegExp("[a-z]");
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

  useEffect(() => {
    dispatch(clear());
    dispatch(getDetails(id));
  }, [dispatch, id]);

  const handleClick = () => {
    history.push("/home");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (poke) {
      dispatch(deleteById(id));
      alert(poke.name + " deleted from DB");
      history.push("/home");
    } else {
      alert("There's no poke to delete, pal");
    }
  };

  if (poke) {
    return (
      <div className="detailContainer">
        <h1 className="detailTitle">Detailed Info</h1>
        <div
          className="infoDetail"
          style={poke?.types ? bGcolour(poke.types[0].name) : null}
        >
          <div className="cardDetailHeader">
            <h2 className="nameDetail">{poke.name}</h2>
            {poke.types && (
              <p className="types" alt="types">
                {poke.types.map((e) => (
                  <img
                    className="typeImage"
                    key={e.name + poke.id + Math.random()}
                    src={typeImg(e.name)}
                    alt="type"
                  />
                ))}
              </p>
            )}
            <span className="pokestatHP" alt="HP">
              <small>
                <b>HP</b>
              </small>
              {poke.HP ? <b>{poke.HP}</b> : <b>178</b>}
            </span>
          </div>
          <img
            className="pokePik"
            style={poke.image ? null : { height: "auto", maxHeight: "30vh" }}
            src={poke.image ? poke.image : missingno}
            alt="pokemon"
          />
          <span className="pokeStatHW">
            <p alt="Height">Height: {poke.height ? poke.height : "3.04"}</p>
            <p alt="Weight">Weight: {poke.weight ? poke.weight : "1590.8"}</p>
          </span>
          <p className="pokestat" alt="ATK">
            Attack: {poke.attack ? poke.attack : "19"}{" "}
          </p>
          <p className="pokestat" alt="DEF">
            Defense: {poke.defense ? poke.defense : "11"}{" "}
          </p>
          <p className="pokestat" alt="SPD">
            Speed: {poke.speed ? poke.speed : "0"}{" "}
          </p>
        </div>
        {regex.test(poke.id) === true ? (
          <button className="delButton" onClick={(e) => handleDelete(e, id)}>
            DELETE
          </button>
        ) : null}
        <button onClick={handleClick} className="backButton">
          RUN
        </button>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default Details;
