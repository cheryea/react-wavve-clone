import React from "react";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import wavvelogo from "../image/Wavve.svg";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";

export const NavLayout = () => {
  const { genre, id } = useParams();
  return (
    <>
      <nav>
        <div className="pc-widths">
          <ul className="flexs">
            <NavLink to={"/"}>
              <img className="logo" src={wavvelogo} />
            </NavLink>
            <li>
              <NavLink to={"/"}>
                <p>영화</p>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/tv"}>
                <p>시리즈</p>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/mylist"}>
                <p>MY</p>
              </NavLink>
            </li>
          </ul>
          <div>
            <SearchBar />
          </div>
        </div>
      </nav>
      <div className="body">
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

const DefaultLayout = () => {
  return <></>;
};

export default DefaultLayout;
