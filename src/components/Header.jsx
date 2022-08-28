import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import {
  showCreated,
  getPokemons,
  getTypes,
  filterByType,
  orderByAtk,
  orderByName,
} from "../redux/actions";
// import "../styles/components.css";

const Header = ({ setCurrentPage }) => {
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();

  const handleOrderName = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderByName(e.target.value));
  };
  const handleOrderAtk = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderByAtk(e.target.value));
  };
  const handleFilterType = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByType(e.target.value));
  };
  const handleFilterSrc = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(showCreated(e.target.value));
  };
  const handleReset = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(getPokemons());
  };
  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);
  return (
    <div className="filterContainer">
      <button className="create">
        <Link style={{ textDecoration: "none" }} to="/create">
          {" "}
          CREATE
        </Link>
      </button>
      <Searchbar />
      <button className="reset" onClick={(e) => handleReset(e)}>
        RESET
      </button>
      <label className="headerLabel">
        Sort by name
        <select className="headerSelect" onChange={(e) => handleOrderName(e)}>
          <option value="">-</option>
          <option value="ASC">A to Z</option>
          <option value="DSC">Z to A</option>
        </select>
      </label>
      <label className="headerLabel">
        Sort by ATK
        <select className="headerSelect" onChange={(e) => handleOrderAtk(e)}>
          <option value="">-</option>
          <option value="LOW">Low to hi</option>
          <option value="HI">Hi to low</option>
        </select>
      </label>
      <label className="headerLabel">
        Filter by TYPE
        <select className="headerSelect" onChange={(e) => handleFilterType(e)}>
          <option value="ALL">All</option>
          {types &&
            types?.map((type) => {
              return (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              );
            })}
        </select>
      </label>
      <label className="headerLabel">
        Filter by source
        <select className="headerSelect" onChange={(e) => handleFilterSrc(e)}>
          <option value="MIXED">Mixed</option>
          <option value="API">API</option>
          <option value="DB">Createds</option>
        </select>
      </label>
    </div>
  );
};

export default Header;
