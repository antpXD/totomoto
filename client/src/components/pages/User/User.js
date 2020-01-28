import React, { useContext, useEffect } from "react";
import UserOfferList from "./UserOfferList";
import AddOffer from "./AddOffer";
import AuthContext from "../../../context/auth/authContext";
import OfferContext from "../../../context/offer/offerContext";

import Navbar from "../../layout/Navbar";

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

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="grid-2 grid-gap__100">
          <div className="left-panel__container">
            <AddOffer />
          </div>

          <div className="right-panel__container">
            <h1 className="section-title">
              <span className="text-light">Your</span>
              <span className="text-dark">offers</span>
            </h1>
            <UserOfferList />
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
