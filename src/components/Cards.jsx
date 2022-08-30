import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemons } from "../redux/actions";
import { Link } from "react-router-dom";
import "../styles/components.css";
import colors from "../styles/colors.js";
export let missingno =
  "https://static.wikia.nocookie.net/espokemon/images/4/41/Mimikyu.png";

const Cards = ({ currentPokes }) => {
  const regex = new RegExp("[a-z]");
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  // const [color, setColor] = useState();

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
            // style={{ backgroundColor: setColor }}
          >
            <div className="cardInfo">
              <h1>#{regex.test(p.id) === true ? "DB" : p.id}</h1>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={"/details/" + p.id}
              >
                <h2>{p.name}</h2>
              </Link>
            </div>
            <img src={p.image ? p.image : missingno} alt="cardimgerror" />
          </div>
        ))}
      </>
    );
  } else {
    return "nothing";
  }
};
export default Cards;
