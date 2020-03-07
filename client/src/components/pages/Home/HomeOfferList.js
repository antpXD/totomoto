import React, { useContext } from "react";

import OfferItem from "./HomeOfferItem";
import Spinner from "../../layout/Spinner";

import OfferContext from "../../../context/offer/offerContext";

const HomeOfferList = ({ filteredOffers }) => {
  const offerContext = useContext(OfferContext);
  const { loading } = offerContext;

  if (filteredOffers && filteredOffers.length === 0 && !loading) {
    return <h3>No results</h3>;
  }

  return (
    <>
      {filteredOffers && !loading ? (
        filteredOffers.map(offer => <OfferItem offer={offer} key={offer._id} />)
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default HomeOfferList;
