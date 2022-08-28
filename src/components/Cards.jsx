import React from "react";
// import "../styles";
export let missingno =
  "https://static.wikia.nocookie.net/espokemon/images/4/41/Mimikyu.png";

const Cards = ({ id, image, name, types }) => {
  return (
    <div className="cardContainer">
      <div className="cardInfo">
        <h1>#{id.length > 3 ? "DB" : id}</h1>
        <h2>{name}</h2>
        <p>
          Types:{" "}
          {id <= 40
            ? types.map((el) => el + "; ")
            : types.map((el) => el.name + "; ")}
        </p>
      </div>
      <img src={image ? image : missingno} alt="cardimgerror" />
    </div>
  );
};
export default Cards;
