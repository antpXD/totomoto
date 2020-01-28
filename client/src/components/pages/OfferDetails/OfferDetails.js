import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import AuthContext from "../../../context/auth/authContext";
import OfferContext from "../../../context/offer/offerContext";
import Spinner from "../../layout/Spinner";
import Navbar from "../../layout/Navbar";
import OfferDetailsCarousel from "./OfferDetailsCarousel";

import ReactQuill from "react-quill";

const OfferDetails = ({ match }) => {
  const offerContext = useContext(OfferContext);
  const authContext = useContext(AuthContext);
  const { getSingleOffer, offerDetails, loading } = offerContext;

  useEffect(() => {
    getSingleOffer(match.params.id);
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      {offerDetails !== null && !loading ? (
        <div className="container">
          <OfferDetailsCarousel images={offerDetails.image} />
          <h1 style={{ fontSize: 48, paddingTop: 48 }}>
            {offerDetails.make} {offerDetails.model}
          </h1>
          <div className="grid-2 grid-px">
            <div className="details-container">
              <h3 className="py-2 py-1">Details</h3>
              <div className="space-between">
                <p className="detail-left-item">
                  <span>Body Type</span>
                </p>
                <p className="detail-right-item">
                  <span>{offerDetails.bodyType}</span>
                </p>
              </div>
              <div className="space-between">
                <p className="detail-left-item">
                  <span>Condition</span>
                </p>
                <p className="detail-right-item">
                  <span>{offerDetails.condition}</span>
                </p>
              </div>
              <div className="space-between">
                <p className="detail-left-item">
                  <span>Year</span>
                </p>
                <p className="detail-right-item">
                  <span>{offerDetails.year}</span>
                </p>
              </div>
              <div className="space-between">
                <p className="detail-left-item">
                  <span>Fuel Type</span>
                </p>
                <p className="detail-right-item">
                  <span>{offerDetails.fuelType}</span>
                </p>
              </div>
              <div className="space-between">
                <p className="detail-left-item">
                  <span>Mileage</span>
                </p>
                <p className="detail-right-item">
                  <span>{offerDetails.mileage}</span>
                </p>
              </div>
              <div className="space-between">
                <p className="detail-left-item">
                  <span>Engine Size</span>
                </p>
                <p className="detail-right-item">
                  <span>{offerDetails.engineSize}</span>
                </p>
              </div>
              <div className="space-between">
                <p className="detail-left-item">
                  <span>Engine Power</span>
                </p>
                <p className="detail-right-item">
                  <span>{offerDetails.enginePower}</span>
                </p>
              </div>
              <div className="space-between">
                <p className="detail-left-item">
                  <span>Price</span>
                </p>
                <p className="detail-right-item">
                  <span>{offerDetails.price}</span>
                </p>
              </div>
              <div>Contact: {offerDetails.email}</div>
            </div>
            <div className="details-container">
              <h3 className="py-2 py-1">Description</h3>
              <ReactQuill
                readOnly={true}
                theme="bubble"
                value={offerDetails.description}
              ></ReactQuill>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

OfferDetails.propTypes = {
  match: PropTypes.object.isRequired
};

export default OfferDetails;
