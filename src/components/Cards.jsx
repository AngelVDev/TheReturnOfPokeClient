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
  const comesFromDb = (item) => {
    regex.test(item);
  };
  const dispatch = useDispatch();
  const bGcolour = (poketype) => {
    if (colors.hasOwnProperty(poketype)) {
      return { backgroundColor: colors[poketype] };
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
              comesFromDb(p.id) === true ? p.types[0].name : p.types[0]
            )}
          >
            <div className="cardInfo">
              <h1>#{comesFromDb(p.id) === true ? "DB" : p.id}</h1>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={"/details/" + p.id}
              >
                <h2>{p.name}</h2>
              </Link>
            </div>
            {comesFromDb(p.id) === true
              ? p?.types.map((t) => (
                  <span
                    className="typeSpan"
                    style={bGcolour(t.name)}
                    key={t.name + p.id + "DB"}
                  >
                    {t.name}
                  </span>
                ))
              : p?.types.map((t) => (
                  <span className="typeSpan" style={bGcolour(t)} key={t + p.id}>
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
