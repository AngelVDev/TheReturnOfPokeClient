import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons } from "../redux/actions";
import { Link } from "react-router-dom";
import "../styles/components.css";
import colors from "../styles/colors.js";
export let missingno =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/MissingNo.png/256px-MissingNo.png?20211220044128";

const Cards = ({ currentPokes }) => {
  const regex = new RegExp("[a-z]");
  const dispatch = useDispatch();
  const bGcolour = (poketypen) => {
    if (colors.hasOwnProperty(poketypen)) {
      return { backgroundColor: colors[poketypen] };
    }
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  if (currentPokes.length > 1) {
    return (
      <>
        {currentPokes?.map((p) => (
          <div className="card" key={p.id} style={bGcolour(p.types[0].name)}>
            <div className="cardInfo" key={p.id + "info"}>
              <h1>#{regex.test(p.id) === true ? "DB" : p.id}</h1>
              <Link
                to={"/details/" + p.id}
                style={{
                  textDecoration: "none",
                  color: "#e3e3e3",
                  textShadow: "0px 0px 2px #acacac",
                  zIndex: "2",
                  fontSize: "x-large",
                }}
              >
                <h2>{p.name}</h2>
              </Link>
              <p className="statCard">ATK: {p.attack}</p>
              <p className="statCard">DEF: {p.defense}</p>
              {p.types.map((t) => (
                <span
                  key={p.id + Math.random() + "typen"}
                  className="typeSpan"
                  style={bGcolour(t.name)}
                >
                  {t.name.toUpperCase()}
                </span>
              ))}
            </div>
            <img src={p.image ? p.image : missingno} alt="cardimgerror" />
          </div>
        ))}
      </>
    );
  } else {
    return (
      <div className="noCardCard">
        <h2>There's no pokemon with that type or name</h2>
      </div>
    );
  }
};
export default Cards;
