import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { slideIn } from "../../animations/animations";
import { Link } from "react-router-dom";
import clsx from "clsx";

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

const Login = props => {
  const classes = useStyles();

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const {
    loginUser,
    registerUser,
    error,
    clearErrors,
    isAuthenticated
  } = authContext;

  const [login, setLogin] = useState(true);

  useEffect(() => {
    // jakieś bugi przed przekierowaniem
    if (isAuthenticated) {
      props.history.push("/user"); //redirecting to main page
    }
    if (error === "Wrong password") {
      setAlert(error, "error");
      clearErrors();
    } else if (error === "User doesn't exist") {
      setAlert(error, "error");
      clearErrors();
    } else if (error === "Name or E-mail is already taken") {
      setAlert(error, "error");
      clearErrors();
    }
  }, [error, isAuthenticated, props.history, clearErrors, setAlert]);

  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur"
  });

  const onLogin = values => {
    loginUser(values);
  };

  const onRegister = values => {
    registerUser(values);
  };

  const loginForm = (
    <form onSubmit={handleSubmit(onLogin)}>
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
        className={clsx(classes.textField, errors.password && classes.borders)}
        name="password"
        inputRef={register({ required: true, minLength: 4 })}
      />
      <div className="auth-section__actions">
        <Button
          variant="contained"
          type="submit"
          className={classes.submitButton}
        >
          Log in! <i className="fas fa-chevron-right" />
        </Button>
        <Link to="/register" className="auth-section__actions--text flex-row">
          You don't have an account?
          <span style={{ fontWeight: 800, paddingLeft: 8 }}>Sign up!</span>
        </Link>
      </div>
    </form>
  );

  const registerForm = (
    <form onSubmit={handleSubmit(onRegister)}>
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
        className={clsx(classes.textField, errors.password && classes.borders)}
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
  );

  return (
    <motion.div
      className="wrapper"
      exit={{ opacity: 0 }}
      initial="initial"
      animate="animate"
    >
      <div className="header-section">
        <div onClick={() => setLogin(!login)}>
          <h1
            className={
              login
                ? "header-section__text"
                : "header-section__text header-section__text--darker"
            }
          >
            login.
            <span className="header-section__text header-section__text--darker">
              {" "}
              /{" "}
            </span>
            <span
              className={
                !login
                  ? "header-section__text"
                  : "header-section__text header-section__text--darker"
              }
            >
              register.
            </span>
          </h1>
        </div>
      </div>
      <motion.div
        className="round-container round-container--generic"
        variants={slideIn}
      >
        <div className="auth-section__container">
          {login ? loginForm : registerForm}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
