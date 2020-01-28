import React, { useContext, useEffect } from "react";
import FilterFunctions from "./FilterFunctions";
import OfferContext from "../../../context/offer/offerContext";
import AuthContext from "../../../context/auth/authContext";
const Home = () => {
  const authContext = useContext(AuthContext);
  const offerContext = useContext(OfferContext);
  const { allOffers, getAllOffers } = offerContext;

  //get all offers to be able to filter them
  useEffect(() => {
    getAllOffers();
    authContext.loadUser();

    //eslint-disable-next-line
  }, []);

  return <div>{allOffers && <FilterFunctions allOffers={allOffers} />}</div>;
};
export default Home;
