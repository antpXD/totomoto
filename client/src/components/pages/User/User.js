import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slideIn } from "../../../animations/animations";
import UserOfferList from "./UserOfferList";
import AddOffer from "./AddOffer";
import AuthContext from "../../../context/auth/authContext";
import OfferContext from "../../../context/offer/offerContext";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" }
};

const User = () => {
  const authContext = useContext(AuthContext);
  const offerContext = useContext(OfferContext);

  useEffect(() => {
    authContext.loadUser();
    if (offerContext.uploadedFiles === null) {
      window.location.reload();
    }
    // eslint-disable-next-line
  }, []);

  const [addOffer, setAddOffer] = useState(false);

  const toggle = () => setAddOffer(!addOffer);

  return (
    <motion.div
      className="wrapper"
      exit={{ opacity: 0 }}
      initial="initial"
      animate="animate"
    >
      <div className="header-section">
        <h1 className="header-section__text">Hi, Piotrek.</h1>
        <div className="add-offer__animated-button" onClick={toggle}>
          <div className="animated-button-content">add offer</div>
        </div>
      </div>

      {addOffer && (
        <AnimatePresence exitBeforeEnter>
          <motion.div
            animate={addOffer ? "open" : "closed"}
            variants={variants}
            exit={{ opacity: 0 }}
          >
            <AddOffer />
          </motion.div>
        </AnimatePresence>
      )}
      <motion.div variants={slideIn}>
        <UserOfferList />
      </motion.div>
    </motion.div>
  );
};

export default User;
