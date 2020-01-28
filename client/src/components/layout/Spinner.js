import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  },
  bar: {
    height: 4,
    boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.2)"
  }
}));

export default function Spinner() {
  const classes = useStyles();
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    function progress() {
      setCompleted(oldCompleted => {
        if (oldCompleted === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldCompleted + diff, 100);
      });
    }

    const timer = setInterval(progress, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
      <LinearProgress
        variant="determinate"
        value={completed}
        color="primary"
        className={classes.bar}
      />
    </div>
  );
}
