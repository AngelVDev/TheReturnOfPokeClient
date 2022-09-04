import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons } from "../redux/actions";
import { Link } from "react-router-dom";
import { Loader } from "../pages/Loader";
import "../styles/components.css";
import colors from "../styles/colors.js";
export let missingno =
  "https://static.wikia.nocookie.net/espokemon/images/4/41/Mimikyu.png";

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
  if (currentPokes) {
    return (
      <>
        {currentPokes?.map((p) => (
          <div className="card" key={p.id} style={bGcolour(p.types[0].name)}>
            <div className="cardInfo" key={p.id + "info"}>
              <h1>#{regex.test(p.id) === true ? "DB" : p.id}</h1>
              <Link
                to={"/details/" + p.id}
                style={{ textDecoration: "none", color: "black", zIndex: "2" }}
              >
                <h2>{p.name}</h2>
              </Link>
            </div>
            {p.types.map((t) => (
              <span
                key={p.id + Math.random() + "typen"}
                className="typeSpan"
                style={bGcolour(t.name)}
              >
                {t.name}
              </span>
            ))}
            <img src={p.image ? p.image : missingno} alt="cardimgerror" />
          </div>
        ))}
      </>
    );
  } else {
    return <Loader />;
  }
};
export default Cards;
