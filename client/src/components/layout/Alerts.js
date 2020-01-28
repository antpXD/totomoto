import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  IconButton,
  Snackbar,
  SnackbarContent,
  makeStyles
} from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import WarningIcon from "@material-ui/icons/Warning";

import AlertContext from "../../context/alert/alertContext";

const variantIcon = {
  success: InsertEmoticonIcon,
  warning: WarningIcon,
  error: MoodBadIcon,
  info: InfoIcon
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: "#4bc07c"
  },
  error: {
    backgroundColor: theme.palette.error.main
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: "#fff06d",
    color: "black"
  },
  container: {
    width: "550px",
    height: "60px"
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className, classes.container)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["error", "info", "success", "warning"]).isRequired
};

// const useStyles2 = makeStyles(theme => ({
//   margin: {
//     margin: theme.spacing(1)
//   }
// }));

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  // const classes = useStyles2();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(true);
  }, [alertContext.alerts]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <div key={alert.id}>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={open}
          autoHideDuration={alert.timeout}
          onClose={handleClose}
        >
          <MySnackbarContentWrapper
            onClose={handleClose}
            variant={alert.type}
            message={alert.msg}
          />
        </Snackbar>
      </div>
    ))
  );
};

export default Alerts;
