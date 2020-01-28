import React, { useReducer } from 'react';
import uuid from 'uuid';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
  const initialState = [];

  //STATE allows to access anything in state
  //anytime you call DISPATCH function, the reducer is called and new modified state is returned
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //Actions

  //Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { id, msg, type }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        //pass anything that we want available for ENTIRE app
        alerts: state,
        setAlert
      }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
