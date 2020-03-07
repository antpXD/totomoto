import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import OfferContext from "../../../context/offer/offerContext";
import Spinner from "../../layout/Spinner";
import Footer from "../../layout/Footer";
import OfferDetailsCarousel from "./OfferDetailsCarousel";

const OfferDetails = ({ match }) => {
  const offerContext = useContext(OfferContext);
  const { getSingleOffer, offerDetails, loading } = offerContext;

  useEffect(() => {
    window.scrollTo(0, 0);
    getSingleOffer(match.params.id);
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="wrapper"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div className="details-page-container">
        {offerDetails !== null && !loading ? (
          <>
            <div className="details-carousel-container">
              <OfferDetailsCarousel images={offerDetails.image} />
            </div>
            <div className="details-container">
              <h1 className="details-title">
                {offerDetails.make} {offerDetails.model}
              </h1>
              <div className="parameters-container">
                <div className="row1">
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
                <div className="row2">
                  <h3>Description</h3>
                  <div>{offerDetails.description}</div>
                </div>
              </div>
              <Footer />
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

OfferDetails.propTypes = {
  match: PropTypes.object.isRequired
};

export default OfferDetails;
