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

export default (state, action) => {
  switch (action.type) {
    case GET_OFFERS:
      return {
        ...state,
        userOffers: action.payload,
        loading: false
      };
    case GET_ALL_OFFERS:
      return {
        ...state,
        allOffers: action.payload,
        loading: false
      };
    case GET_SINGLE_OFFER:
      return {
        ...state,
        offerDetails: action.payload,
        loading: false
      };
    case ADD_OFFER:
      return {
        ...state,
        userOffers: [action.payload, ...state.userOffers],
        loading: false
      };
    case ADD_IMAGE:
      return {
        ...state,
        uploadedFiles: [action.payload, ...state.uploadedFiles],
        loading: false
      };
    case DELETE_OFFER:
      return {
        ...state,
        userOffers: state.userOffers.filter(
          offer => offer._id !== action.payload
        ),
        loading: false
      };
    case CLEAR_OFFERS:
      return {
        ...state,
        userOffers: null,
        allOffers: null,
        uploadedFiles: null,
        current: null,
        filtered: null,
        error: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case UPDATE_OFFER:
      return {
        ...state,
        userOffers: state.userOffers.map(offer =>
          offer._id === action.payload._id ? action.payload : offer
        )
      };
    case CLEAR_IMAGE:
      return {
        ...state,
        uploadedFiles: []
      };
    case OFFER_ERROR:
    case IMAGE_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
