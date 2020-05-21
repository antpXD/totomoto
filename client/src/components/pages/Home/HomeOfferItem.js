import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Tooltip } from "@material-ui/core/";

const dateFormat = require("dateformat");

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
    price,
  } = offer;

  return (
    <div className="card">
      <Link to={`/offer/${_id}`}>
        <img alt="" src={image[0].fileUrl} className="card__image" />
      </Link>

      <div className="card__details">
        <div>
          <div className="card__header">
            <Link to={`/offer/${offer._id}`}>
              <h2>
                {make.charAt(0).toUpperCase() + make.slice(1)}{" "}
                {model.charAt(0).toUpperCase() + model.slice(1)}
              </h2>
            </Link>
            <div className="card__follow">
              <p>Follow</p>
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
        <div className="flex-row" style={{ justifyContent: "space-between" }}>
          <div className="card__date">
            <i className="far fa-clock" />
            <p>{dateFormat(date, "dS mmmm")}</p>
          </div>
          <div className="card__price">${price}</div>
        </div>
      </div>
    </div>
  );
};

HomeOfferItem.propTypes = {
  offer: PropTypes.object.isRequired,
};

export default HomeOfferItem;
