import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loader from "./Loader";
import { clear, deleteById, getDetails } from "../redux/actions";
import { missingno } from "../components/Cards";
// import "../styles/pages.css";

const Details = ({ match }) => {
  const dispatch = useDispatch();
  const { id } = match.params;
  const history = useHistory();
  const poke = useSelector((state) => state.pokeDetail);
  const regex = new RegExp("[a-z]");

  useEffect(() => {
    dispatch(clear());
    dispatch(getDetails(id));
  }, [dispatch, id]);

  const handleClick = () => {
    history.push("/home");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (poke.length) {
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
        <h1>Detailed Info</h1>
        <h2 className="nameDetail">
          {poke.id === 7 ? "VAMO A CALMARNO" : poke.name}
        </h2>
        <img
          className="pokePik"
          src={poke.image ? poke.image : missingno}
          alt="pokemon"
        />
        <div className="infoDetail">
          {poke.types && (
            <p className="types" alt="types">
              <b>Types: </b>
              {poke.types.map((e) => (
                <span className="typeSpan" key={poke.id + e.name}>
                  {e.name}
                </span>
              ))}
            </p>
          )}
          <p className="pokestat" alt="HP">
            Health points: {poke.HP ? poke.HP : "178"}
          </p>
          <p className="pokestat" alt="ATK">
            Attack: {poke.attack ? poke.attack : "19"}{" "}
          </p>
          <p className="pokestat" alt="DEF">
            Defense: {poke.defense ? poke.defense : "11"}{" "}
          </p>
          <p className="pokestat" alt="SPD">
            Speed: {poke.speed ? poke.speed : "0"}{" "}
          </p>
          <p className="pokestat" alt="Height">
            Height: {poke.height ? poke.height : "3.04"}
          </p>
          <p className="pokestat" alt="Weight">
            Weight: {poke.weight ? poke.weight : "1590.8"}
          </p>
        </div>
        {regex.test(poke.id) === true ? (
          <button className="delButton" onClick={(e) => handleDelete(e, id)}>
            Delete
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
