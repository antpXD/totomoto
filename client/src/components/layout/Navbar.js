import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import OfferContext from "../../context/offer/offerContext";

import { Menu, MenuItem, Grow } from "@material-ui/core/";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;

  const offerContext = useContext(OfferContext);
  const { clearOffers } = offerContext;

  const [menu, setMenu] = useState(null);
  const open = Boolean(menu);

  const handleClick = event => {
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
    <Fragment>
      <li className="all-center">
        <button className="logout-btn" onClick={handleClick}>
          {user && user.name}
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
              borderRadius: "none"
            }
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
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar">
      <Link to="/" className="flex-row">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="50px"
          height="50px"
          viewBox="0 0 1000 1000"
          enableBackground="new 0 0 1000 1000"
        >
          <g>
            <path d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490S770.6,10,500,10z M500,884.7c-212.2,0-384.7-172.6-384.7-384.7c0-212.1,172.5-384.7,384.7-384.7c212.1,0,384.8,172.6,384.8,384.7C884.8,712.1,712.1,884.7,500,884.7z" />
            <path d="M500,159.2c-188.3,0-340.8,152.6-340.8,340.8c0,188.2,152.6,340.8,340.8,340.8c188.3,0,340.8-152.6,340.8-340.8C840.8,311.8,688.3,159.2,500,159.2z M748.4,605.7c-0.3-0.2-0.6-0.6-0.8-0.8l-123.5-81.6c1.4-7.6,2.4-15.4,2.4-23.4c0-8-0.9-15.8-2.4-23.4L747.6,395c0.3-0.2,0.5-0.6,0.8-0.8c13.8,32.5,21.6,68.2,21.6,105.8C770,537.5,762.2,573.2,748.4,605.7z M713.9,335.9c-0.1,0-0.3,0.1-0.5,0.1l-132.5,67.7c-11.2-9.5-24-17.1-38.1-22.2l-7.6-148.4c0-0.2-0.2-0.5-0.2-0.7C607.7,242,671.3,280.4,713.9,335.9z M499.9,560.1c-33.2,0-60.1-26.9-60.1-60.1c0-33.2,26.9-60.1,60.1-60.1c33.2,0,60,26.9,60,60.1C560,533.2,533.1,560.1,499.9,560.1z M467.2,232.2c0,0.3-0.2,0.7-0.3,1l-8.8,148.1c-15,5.3-28.4,13.2-40.2,23.2l-132.7-66.4c-0.2-0.1-0.5-0.1-0.7-0.2C327.6,280.8,392.7,241.2,467.2,232.2z M250.6,396.7c0.2,0.1,0.3,0.4,0.5,0.5l124.6,80.7c-1.2,7.2-2.2,14.5-2.2,22.1c0,7.6,1,15,2.3,22.2l-124.6,80.7c-0.2,0.1-0.3,0.4-0.5,0.5C237.4,571.5,230,536.6,230,500C230,463.4,237.4,428.6,250.6,396.7z M284.6,662.1c0.2-0.1,0.5-0.1,0.7-0.2L418,595.6c11.8,10.1,25.2,18,40.2,23.2l8.8,148.1c0,0.3,0.2,0.7,0.2,1C392.7,758.8,327.7,719.3,284.6,662.1z M535.1,767.5c0-0.2,0.2-0.4,0.2-0.6l7.7-148.4c14-5.2,26.8-12.7,38.1-22.2L713.5,664c0.1,0,0.3,0.1,0.4,0.1C671.3,719.6,607.7,758,535.1,767.5z" />
          </g>
        </svg>
        <h2 className="logo p-left__16">toTOmoto</h2>
      </Link>

      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

export default Navbar;
