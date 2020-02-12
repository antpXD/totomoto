import React, { useContext, useEffect } from "react";
import FilterFunctions from "./FilterFunctions";
import { motion } from "framer-motion";

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

  return (
    <motion.div
      className="wrapper"
      exit={{ opacity: 0 }}
      initial="initial"
      animate="animate"
    >
      {allOffers && <FilterFunctions allOffers={allOffers} />}
    </motion.div>
  );
};
export default Home;
