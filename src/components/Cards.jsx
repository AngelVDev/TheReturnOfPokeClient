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
          <div
            className="card"
            key={p.id}
            style={bGcolour(
              regex.test(p.id) === true ? p.types[0].name : p.types[0]
            )}
          >
            <div className="cardInfo" key={p.id + "info"}>
              <h1>#{regex.test(p.id) === true ? "DB" : p.id}</h1>
              <Link
                to={"/details/" + p.id}
                style={{ textDecoration: "none", color: "black" }}
              >
                <h2>{p.name}</h2>
              </Link>
            </div>
            {console.log(p.id)}
            {regex.test(p.id) === true
              ? p?.types.map((t) => (
                  <span
                    className="typeSpan"
                    style={bGcolour(t?.name)}
                    key={p.id + "typenFromDB"}
                  >
                    {t.name}
                  </span>
                ))
              : p?.types.map((t) => (
                  <span
                    className="typeSpan"
                    style={bGcolour(t)}
                    key={t + Math.random()}
                  >
                    {t}
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
