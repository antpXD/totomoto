import React from "react";
import clsx from "clsx";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  makeStyles
} from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  openButton: {
    display: "flex",
    padding: "4px 16px",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  confirmButton: {
    padding: "0 16px",
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.error.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.error.dark
    }
  },
  cancelButton: {
    padding: "0 16px",
    marginRight: theme.spacing(2)
  },
  btnText: {
    color: theme.palette.error.dark
  },

  dialogActions: {
    padding: "30px"
  }
}));

export default function ConfirmDialog({
  dialogTitle,
  dialogText,
  onDelete,
  defaultOpenButton
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const onClickOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onConfirm = () => {
    onDelete();
    setOpen(false);
  };

  return (
    <div>
      <div
        onClick={onClickOpen}
        className={
          !defaultOpenButton
            ? clsx(classes.btnText, classes.openButton)
            : classes.btnText
        }
      >
        Delete
      </div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" disableTypography={true}>
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            onClick={onClose}
            className={classes.cancelButton}
          >
            Cancel
          </Button>
          <Button
            size="small"
            onClick={onConfirm}
            className={classes.confirmButton}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
