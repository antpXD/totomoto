import React, { useContext } from "react";
import Fade from "react-reveal/Fade";

import OfferItem from "./HomeOfferItem";
import Spinner from "../../layout/Spinner";

import OfferContext from "../../../context/offer/offerContext";

const HomeOfferList = ({ filteredOffers }) => {
  const offerContext = useContext(OfferContext);
  const { loading } = offerContext;

  if (filteredOffers && filteredOffers.length === 0 && !loading) {
    return <h2>No results</h2>;
  }

  return (
    <>
      {filteredOffers && !loading ? (
        filteredOffers.map(offer => (
          // fade fires when offers are loaded
          <Fade key={offer._id}>
            <OfferItem offer={offer} />
          </Fade>
        ))
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default HomeOfferList;
