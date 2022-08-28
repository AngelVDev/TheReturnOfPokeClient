import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      Landing
      <Link to={"/home/"}>
        <button>Apretame</button>
      </Link>
    </div>
  );
};

export default Landing;
