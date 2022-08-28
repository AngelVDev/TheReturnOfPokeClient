import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Cards";
// import Header from "../components/Header";
import Loader from "./Loader";
import Pagination from "../components/Pagination";

const Home = () => {
  const pokes = useSelector((state) => state.allPokes);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [pokesPerPage, setPokesPerPage] = useState(12);
  const indexOfLastPoke = currentPage * pokesPerPage;
  const indexOfFirstPoke = indexOfLastPoke - pokesPerPage;
  const currentPokes = pokes?.slice(indexOfFirstPoke, indexOfLastPoke);
  const pagination = (pageNum) => {
    setCurrentPage(pageNum);
  };
  if (pokes) {
    return (
      <div className="homeDiv">
        {/* <Header setCurrentPage={setCurrentPage} /> */}
        <Pagination
          pokes={pokes}
          pokesPerPage={pokesPerPage}
          pagination={pagination}
        />
        <Card currentPokes={currentPokes} />
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default Home;
