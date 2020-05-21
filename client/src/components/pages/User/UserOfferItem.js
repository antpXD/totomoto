import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import OfferContext from "../../../context/offer/offerContext";

import ConfirmDialog from "../../layout/ConfirmDialog";

import { IconButton, Menu, MenuItem } from "@material-ui/core/";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const UserOfferItem = ({ offer, toggle, onEditToggle }) => {
  const offerContext = useContext(OfferContext);
  const { deleteOffer, setCurrent, clearCurrent } = offerContext;

  const { _id, make, image, model, date, price } = offer;

  const [menu, setMenu] = useState(null);
  const open = Boolean(menu);

  //opens menu
  const handleClick = (event) => {
    setMenu(event.currentTarget);
  };

  const handleClose = () => {
    setMenu(null);
  };

  const onEdit = () => {
    onEditToggle();
    setCurrent(offer);
    handleClose();
  };

  const onDelete = () => {
    deleteOffer(_id);
    clearCurrent();
  };

  const dateFormat = require("dateformat");

  const formatedMake = make.charAt(0).toUpperCase() + make.slice(1);
  const formatedModel = model.charAt(0).toUpperCase() + model.slice(1);

  return (
    <div className="card-small">
      <div className="card-small__details">
        {image.length >= 0 ? (
          <Link to={`/offer/${_id}`}>
            <img
              alt="{s[0].fileName}"
              src={image[0].fileUrl}
              className="card-small__image"
            />
          </Link>
        ) : (
          <div>NO IMAGE</div>
        )}

        <div>
          <div className="card-small__header">
            <Link to={`/offer/${_id}`}>
              <h2
                className="header-text"
                style={
                  formatedMake.length + formatedModel.length > 14
                    ? { fontSize: "22px", paddingTop: 4 }
                    : null
                }
              >
                {formatedMake} {formatedModel}
              </h2>
            </Link>
            <div className="card-small__actions">
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
                    marginTop: 60,
                  },
                }}
              >
                <MenuItem onClick={handleClose}>
                  <i className="far fa-star" />
                  <div>Follow</div>
                </MenuItem>
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
        </div>
        <div className="card-small__date">
          <i className="far fa-clock" />
          {dateFormat(date, "dS mmmm")}
        </div>
        <div className="card-small__price">${price}</div>
      </div>
    </div>
  );
};

UserOfferItem.propTypes = {
  offer: PropTypes.object.isRequired,
};

export default UserOfferItem;
