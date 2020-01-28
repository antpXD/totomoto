import React, { useContext, Fragment, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Fade from "react-reveal/Fade";

import UserOfferItem from "./UserOfferItem";
import Spinner from "../../layout/Spinner";

import OfferContext from "../../../context/offer/offerContext";

const UserOfferList = () => {
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
    <Fragment>
      {userOffers && !loading ? (
        <TransitionGroup>
          {userOffers && !loading ? (
            userOffers.map(offer => (
              // csstransition animates adding/deleting offer
              <CSSTransition key={offer._id} timeout={500} classNames="item">
                {/* fade animates offers on load */}
                <Fade>
                  <UserOfferItem offer={offer} />
                </Fade>
              </CSSTransition>
            ))
          ) : (
            <Spinner />
          )}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default UserOfferList;
