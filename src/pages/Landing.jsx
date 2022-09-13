import React from "react";
import { Link } from "react-router-dom";
import vidDay from "../assets/vidDay.mp4";
import vidNite from "../assets/vidNite.mp4";

const Landing = () => {
  const date = new Date();
  return (
    <div className="bgLanding">
      <video style={{ width: "100vw", zIndex: -1 }} loop autoPlay>
        <source
          src={
            date.getHours() < 7 || date.getHours() > 19
              ? vidNite
              : date.getHours() >= 7 || date.getHours() < 19
              ? vidDay
              : null
          }
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <Link
        style={{ textDecoration: "none", zIndex: 1, position: "static" }}
        to={"/home/"}
      >
        <button>Apretame</button>
      </Link>
    </div>
  );
};

export default Landing;
