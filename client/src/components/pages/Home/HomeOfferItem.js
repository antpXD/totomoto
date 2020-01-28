import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Tooltip } from "@material-ui/core/";

const HomeOfferItem = ({ offer }) => {
  const {
    _id,
    make,
    image,
    fuelType,
    model,
    condition,
    year,
    mileage,
    date,
    price
  } = offer;

  // console.log(offer);
  const dateFormat = require("dateformat");

  return (
    <div className="card">
      <Link to={`/offer/${_id}`}>
        <img
          alt={image[0].fileName}
          src={image[0].filePath}
          className="card__image"
        />
      </Link>
      <div className="card__details">
        <div>
          <div className="card__header">
            <Link to={`/offer/${_id}`}>
              <h2 className="header-text">
                {make.charAt(0).toUpperCase() + make.slice(1)}{" "}
                {model.charAt(0).toUpperCase() + model.slice(1)}
              </h2>
            </Link>
            <div className="card__follow">
              Follow
              <i className="far fa-star" />
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

HomeOfferItem.propTypes = {
  offer: PropTypes.object.isRequired
};

export default HomeOfferItem;
