import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import OfferContext from "../../context/offer/offerContext";
import { ReactComponent as LogoSVG } from "../../images/Logo.svg";
import { ReactComponent as ArrowLeftSVG } from "../../images/ArrowLeft.svg";

import { Menu, MenuItem, Grow } from "@material-ui/core/";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;
  console.log(window.location);
  const offerContext = useContext(OfferContext);
  const { clearOffers } = offerContext;

  const [menu, setMenu] = useState(null);
  const open = Boolean(menu);

  const handleClick = (event) => {
    setMenu(event.currentTarget);
  };

  const handleClose = () => {
    setMenu(null);
  };

  const onLogout = () => {
    setMenu(null);
    logout();
    clearOffers();
  };

  const authLinks = (
    <>
      <li className="all-center">
        <button className="logout-btn" onClick={handleClick}>
          <p>{user && user.name}</p>
          <i className="far fa-user" />
        </button>
        <Menu
          elevation={1}
          id="long-menu"
          anchorEl={menu}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Grow}
          PaperProps={{
            style: {
              width: 160,
              marginTop: 40,
              borderRadius: "none",
            },
          }}
        >
          <Link to="/user">
            <MenuItem onClick={handleClose}>Your account</MenuItem>
          </Link>
          <Link to="/login">
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </Link>
          ))}
        </Menu>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to="/login" className="logout-btn">
          Login
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar">
      <Link to="/" className="logo flex-row">
        {!window.location.pathname.includes("/offer/") ? (
          <>
            <LogoSVG />
            <h2 className="logo__text p-left__8 p-top__8">toTOmoto</h2>
          </>
        ) : (
          <>
            <ArrowLeftSVG />{" "}
            <a className="logout-btn" style={{ fontSize: "16px" }}>
              Back
            </a>
          </>
        )}
      </Link>

      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

export default Navbar;
