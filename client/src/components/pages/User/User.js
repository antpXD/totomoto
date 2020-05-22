import React, { useContext, useEffect, useState } from "react";
import UserOfferList from "./UserOfferList";
import AddOffer from "./AddOffer";
import AuthContext from "../../../context/auth/authContext";
import OfferContext from "../../../context/offer/offerContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const User = () => {
  const authContext = useContext(AuthContext);
  const { loadUser, user } = authContext;

  const offerContext = useContext(OfferContext);

  useEffect(() => {
    loadUser();
    window.scrollTo(0, 0);
    offerContext.getUserOffers();
    // eslint-disable-next-line
  }, []);

  const [showAddOffer, setShowAddOffer] = useState(false);
  const toggle = () => {
    // uploadedFilles bug
    setShowAddOffer(!showAddOffer);
  };
  const onEditToggle = () => showAddOffer === false && setShowAddOffer(true);

  if (offerContext.uploadedFiles === null && !offerContext.loading) {
    window.location.reload();
  }

  return (
    <div className="wrapper">
      <CSSTransition in={true} appear={true} timeout={500} classNames="zoomIn">
        <div className="header-section">
          <h1 className="header-section__text">Hi, {user && user.name}.</h1>
          <div className="add-offer__animated-button" onClick={toggle}>
            <div className="animated-button-content">
              {!showAddOffer ? "add offer" : "close"}
            </div>
          </div>
        </div>
      </CSSTransition>

      <TransitionGroup>
        {showAddOffer && (
          <CSSTransition
            in={showAddOffer}
            appear={false}
            timeout={800}
            classNames="fadeIn"
          >
            <AddOffer toggle={toggle} />
          </CSSTransition>
        )}

        <CSSTransition
          in={showAddOffer ? showAddOffer : true}
          appear={true}
          // onEnter
          timeout={800}
          classNames="slideIn"
        >
          <UserOfferList onEditToggle={onEditToggle} />
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default User;
