import React from "react";
import { Link } from "react-router-dom";
import vidDay from "../assets/vidDay.gif";
import vidNite from "../assets/vidNite.gif";

const Landing = () => {
  const date = new Date();
  const bgColour = (date) => {
    if (date.getHours() < 7 || date.getHours() > 19) {
      return {
        background:
          "linear-gradient(139deg, #95CA6D 18%, #C75486 53%, #5D0059 100%)",
      };
    } else {
      return {
        background:
          "linear-gradient(139deg, #4E6BF1 14%, rgba(143, 147, 255, 0.49) 54%, #61107D 90%)",
      };
    }
  };
  return (
    <div className="bgLanding" style={bgColour(date)}>
      <img
        className="pokeLogo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
        alt="pokeLogo"
      />
      <h2 className="h2Landing">
        ¡There are many pokémons waiting for you in this site!
      </h2>
      <img
        className="landingVideo"
        src={
          date.getHours() < 7 || date.getHours() > 19
            ? vidNite
            : date.getHours() >= 7 || date.getHours() < 19
            ? vidDay
            : null
        }
        alt="background failed"
      ></img>

      <Link
        style={{
          textDecoration: "none",
          zIndex: 1,
          position: "absolute",
          maxHeight: "5vh",
          display: "contents",
        }}
        to={"/home/"}
      >
        <button className="landingBtn">Let's check</button>
      </Link>
    </div>
  );
};

export default Landing;
