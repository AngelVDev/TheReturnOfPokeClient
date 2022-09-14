import React from "react";
import Loading from "../assets/Loading.gif";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "black",
        height: "100vh",
      }}
    >
      <img
        style={{ width: "auto", height: "100vh", position: "absolute" }}
        src={Loading}
        alt="Loader"
      />
      ;
    </div>
  );
};

export default Loader;
