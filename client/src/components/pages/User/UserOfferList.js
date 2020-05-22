import React, { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import UserOfferItem from "./UserOfferItem";
import Spinner from "../../layout/Spinner";
import Footer from "../../layout/Footer";

import OfferContext from "../../../context/offer/offerContext";

const UserOfferList = ({ onEditToggle }) => {
  const offerContext = useContext(OfferContext);
  const { userOffers, loading } = offerContext;

  if (userOffers !== null && userOffers.length === 0 && !loading) {
    return (
      <div className="user-offer user-offer__no-offer--text">
        You have no offers. Yet!
      </div>
    );
  }

  return (
    <div>
      <div className="round-container">
        <div className="container">
          <h1>Your offers</h1>
          {userOffers !== null && !loading ? (
            <TransitionGroup className="user-offer__container">
              {userOffers &&
                userOffers.map((offer) => (
                  <CSSTransition
                    key={offer._id}
                    timeout={500}
                    classNames="page"
                  >
                    <UserOfferItem offer={offer} onEditToggle={onEditToggle} />
                  </CSSTransition>
                ))}
            </TransitionGroup>
          ) : (
            <Spinner />
          )}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UserOfferList;
