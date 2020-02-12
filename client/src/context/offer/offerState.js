import React, { useReducer } from "react";
import axios from "axios";
import OfferContext from "./offerContext";
import OfferReducer from "./offerReducer";
import {
  GET_OFFERS,
  GET_ALL_OFFERS,
  GET_SINGLE_OFFER,
  ADD_OFFER,
  DELETE_OFFER,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_OFFER,
  CLEAR_OFFERS,
  OFFER_ERROR,
  ADD_IMAGE,
  IMAGE_ERROR,
  CLEAR_IMAGE
} from "../types";

const OfferState = props => {
  const initialState = {
    userOffers: null,
    allOffers: null,
    offerDetails: null,
    current: null,
    uploadedFiles: [],
    error: null
  };
  const [state, dispatch] = useReducer(OfferReducer, initialState);

  //Actions
  //Get user's offers
  const getOffers = async () => {
    try {
      const res = await axios.get("/api/offers");
      dispatch({
        type: GET_OFFERS,
        payload: res.data //user's offers data
      });
    } catch (error) {
      dispatch({
        type: OFFER_ERROR,
        payload: error.response.msg
      });
    }
  };
  // Get all users offers
  const getAllOffers = async () => {
    try {
      const res = await axios.get("/api/offers/main/all");

      dispatch({
        type: GET_ALL_OFFERS,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: OFFER_ERROR,
        payload: error.response.msg
      });
    }
  };

  const getSingleOffer = async id => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.get(`/api/offers/${id}`, config);
      dispatch({
        type: GET_SINGLE_OFFER,
        payload: res.data
      });
    } catch (error) {
      dispatch({ type: OFFER_ERROR, payload: error.response.msg });
    }
  };

  //Add Offer
  const addOffer = async offer => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/offers", offer, config);
      dispatch({
        type: ADD_OFFER,
        payload: res.data
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: OFFER_ERROR, payload: error.response.msg });
    }
  };

  //Add image
  const addImage = async formData => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    try {
      const res = await axios.post("/api/offers/upload", formData, config);
      dispatch({
        type: ADD_IMAGE,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: IMAGE_ERROR,
        payload: error.response.data.msg
      });
    }
  };

  //Update Offer
  const updateOffer = async offer => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.put(`/api/offers/${offer._id}`, offer, config);
      dispatch({
        type: UPDATE_OFFER,
        payload: res.data
      });
    } catch (error) {
      dispatch({ type: OFFER_ERROR, payload: error.response.msg });
    }
  };

  //Delete Offer
  const deleteOffer = async id => {
    try {
      await axios.delete(`/api/offers/${id}`);
      dispatch({
        type: DELETE_OFFER,
        payload: id
      });
    } catch (error) {
      dispatch({
        type: OFFER_ERROR,
        payload: error.response.msg
      });
    }
  };

  //Clear Offers
  const clearOffers = () => {
    dispatch({
      type: CLEAR_OFFERS
    });
  };

  //Set Current Offer
  const setCurrent = offer => {
    dispatch({
      type: SET_CURRENT,
      payload: offer
    });
  };
  //Clear Current Offer
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  //Clear Image Array
  const clearImage = () => {
    dispatch({
      type: CLEAR_IMAGE
    });
  };

  return (
    <OfferContext.Provider
      value={{
        userOffers: state.userOffers,
        allOffers: state.allOffers,
        offerDetails: state.offerDetails,
        current: state.current,
        uploadedFiles: state.uploadedFiles,
        error: state.error,
        //actions
        getOffers,
        getAllOffers,
        getSingleOffer,
        addOffer,
        deleteOffer,
        setCurrent,
        clearCurrent,
        updateOffer,
        clearOffers,

        clearImage,
        addImage
      }}
    >
      {props.children}
    </OfferContext.Provider>
  );
};

export default OfferState;
