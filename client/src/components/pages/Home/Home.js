import React, { useContext, useEffect } from "react";
import FilterFunctions from "./FilterFunctions";

import OfferContext from "../../../context/offer/offerContext";

const Home = () => {
  const offerContext = useContext(OfferContext);
  const { allOffers, getAllOffers } = offerContext;

  //get all offers to be able to filter them
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllOffers();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="wrapper">
      {allOffers && <FilterFunctions allOffers={allOffers} />}
    </div>
  );
};
export default Home;
