import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Navbar from "../layout/Navbar";

import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import useForm from "react-hook-form";

import { Button, makeStyles } from "@material-ui/core";

import ValidationInput from "../layout/ValidationInput";
import PasswordInput from "../layout/PasswordInput";

const useStyles = makeStyles(theme => ({
  borders: {
    borderColor: "#db1c3c",
    background: "#ffe8e8",
    "&:hover": {
      borderColor: "#db1c3c",
      background: "#fff2f2"
    }
  },
  textField: {
    marginBottom: theme.spacing(2)
  },
  marginTopBottom: {
    marginBottom: theme.spacing(8),
    margintop: theme.spacing(4)
  },
  submitButton: {
    background: theme.palette.primary.main,
    "&:hover": {
      background: theme.palette.primary.main
    }
  }
}));

const Register = props => {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const { registerUser, isAuthenticated, error, clearErrors } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/user"); //redirecting
    }
    if (error === "Name or E-mail is already taken") {
      setAlert(error, "error");
      clearErrors();
    }
  }, [isAuthenticated, props.history, error, setAlert, clearErrors]);

  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur"
  });
  const onSubmit = values => {
    registerUser(values);
  };

  return (
    <div style={{ position: "absolute", width: "100%" }}>
      <Navbar />
      <div className="header-section">
        <h1 className="hero-section__text">register.</h1>
      </div>
      <div className="auth-section__container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ValidationInput
            error={errors.name ? true : false}
            label="NAME"
            className={clsx(classes.textField, errors.name && classes.borders)}
            name="name"
            inputRef={register({ required: true, minLength: 4 })}
          />
          <ValidationInput
            error={errors.email ? true : false}
            label="EMAIL"
            className={clsx(classes.textField, errors.email && classes.borders)}
            name="email"
            inputRef={register({
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            })}
          />
          <PasswordInput
            error={errors.password ? true : false}
            label="PASSWORD"
            className={clsx(
              classes.textField,
              errors.password && classes.borders
            )}
            name="password"
            inputRef={register({ required: true, minLength: 4 })}
          />

          <div className="form-section__actions">
            <Button
              variant="contained"
              type="submit"
              className={classes.submitButton}
            >
              Sign in! <i className="fas fa-chevron-right" />
            </Button>
            <Link to="/login" className="form-section__actions--text flex-row">
              Already registered?
              <span style={{ fontWeight: 800, paddingLeft: 8 }}>Log in!</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
