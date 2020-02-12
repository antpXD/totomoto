import React, { useContext, useEffect } from "react";

import UserOfferItem from "./UserOfferItem";
import Spinner from "../../layout/Spinner";

import OfferContext from "../../../context/offer/offerContext";

const UserOfferList = ({ toggle }) => {
  const offerContext = useContext(OfferContext);
  const { userOffers, getOffers, loading } = offerContext;

  useEffect(() => {
    getOffers();
    // eslint-disable-next-line
  }, []);

  if (userOffers !== null && userOffers.length === 0 && !loading) {
    return <h4>You have no offers. YET!</h4>;
  }

  return (
    <div>
      {/* <div className="header-section">
        <h1 className="header-section__text">Hi, Piotrek.</h1>
        <div className="add-offer__animated-button" onClick={toggle}>
          <div className="animated-button-content">add offer</div>
        </div>
      </div> */}
      <div className="round-container round-container--generic">
        <div className="container">
          <h1>Your offers</h1>
          <div className="flex-row">
            {userOffers && !loading ? (
              userOffers.map(offer => (
                <UserOfferItem offer={offer} key={offer._id} />
              ))
            ) : (
              <Spinner />
            )}
          </div>
          <div className="footer">FOOTER HERE</div>
        </div>
      </div>
    </div>
  );
};

export default UserOfferList;
