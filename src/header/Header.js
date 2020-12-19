import React from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import "./Header.css";

function Header() {
  return (
    <nav className="header">
      {/*Logo */}
      <Link to="/">
        <img className="header__logo" src={logo} alt="Logo" />
      </Link>
      <div>
        <span className="header__title">Bank of States</span>
      </div>
      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link to="/login" className="header__link">
          <div className="header__option">
            <span className="header__lineOne">Hello</span>
            <span className="header__lineTwo">Sign In</span>
          </div>
        </Link>
        <Link to="/register" className="header__link">
          <div className="header__option">
            <span className="header__lineOne">New User</span>
            <span className="header__lineTwo">Register</span>
          </div>
        </Link>
        <Link to="/checkout" className="header__link">
          <div className="header__optionBasket">
            <ShoppingCart />
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
