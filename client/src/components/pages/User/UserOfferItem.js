import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import OfferContext from "../../../context/offer/offerContext";

import ConfirmDialog from "../../layout/ConfirmDialog";

import { IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core/";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const UserOfferItem = ({ offer }) => {
  const offerContext = useContext(OfferContext);
  const { deleteOffer, setCurrent, clearCurrent } = offerContext;

  const {
    _id,
    make,
    image,
    fuelType,
    model,
    condition,
    year,
    date,
    mileage,
    price
  } = offer;

  const [menu, setMenu] = useState(null);
  const open = Boolean(menu);

  //opens menu
  const handleClick = event => {
    setMenu(event.currentTarget);
  };

  const handleClose = () => {
    setMenu(null);
  };

  const onEdit = () => {
    setCurrent(offer);
    handleClose();
  };

  const onDelete = () => {
    deleteOffer(_id);
    clearCurrent();
  };

  const dateFormat = require("dateformat");

  return (
    <div className="card">
      {/* ZABEZPIECZENIE JAKBY OBRAZKA NIE BYLO */}
      {image.length >= 0 ? (
        <Link to={`/offer/${_id}`}>
          <img
            alt={image[0].fileName}
            src={image[0].filePath}
            className="card__image"
          />
        </Link>
      ) : (
        <div>NO IMAGE</div>
      )}

      <div className="card__details">
        <div>
          <div className="card__header">
            <Link to={`/offer/${_id}`}>
              <h2 className="header-text">
                {make.charAt(0).toUpperCase() + make.slice(1)}{" "}
                {model.charAt(0).toUpperCase() + model.slice(1)}
              </h2>
            </Link>
            <div className="card__actions">
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                elevation={3}
                id="long-menu"
                anchorEl={menu}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    width: 200,
                    marginTop: 60
                  }
                }}
              >
                <MenuItem onClick={handleClose}>
                  <i className="far fa-star" />
                  <div>Follow</div>
                </MenuItem>
                {/* <Link to="/user/add-offer"> */}
                <MenuItem onClick={onEdit}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>
                  <ConfirmDialog
                    dialogTitle="Delete your offer"
                    dialogText="Are you sure you want to delete this offer?"
                    color="error"
                    onDelete={onDelete}
                    defaultOpenButton={false}
                  />
                </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
          <div className="card__list">
            <Tooltip title="Year">
              <div className="card__item">{year}</div>
            </Tooltip>
            <Tooltip title="Fuel type">
              <div className="card__item">{fuelType}</div>
            </Tooltip>
            <Tooltip title="Condition">
              <div className="card__item">{condition}</div>
            </Tooltip>
            <Tooltip title="Mileage">
              <div className="card__item">{mileage} KM</div>
            </Tooltip>
          </div>
        </div>
        <div>
          <i className="far fa-clock" />
          {dateFormat(date, "dS mmmm")}
        </div>
        <div className="card__price">${price}</div>
      </div>
    </div>
  );
};

UserOfferItem.propTypes = {
  offer: PropTypes.object.isRequired
};

export default UserOfferItem;
