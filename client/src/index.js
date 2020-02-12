import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  spacing: 8,
  typography: {
    fontFamily: "'Nunito', sans-serif"
  },
  palette: {
    primary: {
      light: "#d8d8d8",
      main: "#000",
      dark: "#333"
    },
    secondary: {
      main: "#8a2be2"
    },
    error: {
      main: "#EB321E",
      dark: "#d13639"
    }
  },
  shape: {
    borderRadius: 4
  },
  overrides: {
    MuiInput: {
      root: {
        minWidth: "100px",
        fontFamily: '"Nunito", sans-serif',
        fontWeight: "600",
        fontSize: "14px",
        color: "#3A3A3A",
        backgroundColor: "#f3f3f3",
        border: "none",
        borderRadius: 10,
        padding: "8px 16px",
        transition: "all .3s ease-in-out",
        "&:hover": {
          transition: "all .3s ease-in-out"
        },
        "&$focused": {
          transition: "all .3s ease-in-out"
        }
      }
    },

    //Add offer form input
    MuiOutlinedInput: {
      root: {
        fontFamily: '"Nunito", sans-serif',
        fontWeight: "600",
        color: "#fff",
        backgroundColor: "#333",
        border: "2px solid #333",
        borderRadius: 4,
        transition: "all .3s ease-in-out",
        "& fieldset": {
          borderRadius: 4,
          border: "none"
        },
        "&:hover": {
          backgroundColor: "transparent",
          border: "2px solid #8a2be2",
          transition: "all .3s ease-in-out",
          boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)"
        },
        "&$focused": {
          transition: "all .3s ease-in-out",
          boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)",
          transform: "translateY(-2px)"
        }
      }
    },

    //Login / Register Inputs
    MuiFilledInput: {
      root: {
        color: "#3A3A3A",
        border: "2px solid #ededed",
        overflow: "hidden",
        backgroundColor: "#f0f0f0",
        fontFamily: '"Nunito", sans-serif',
        fontWeight: "600",
        transition: "all .3s ease-in-out",
        borderRadius: 4,
        "&:hover": {
          backgroundColor: "#f5f5f5",
          border: "2px solid #c4c4c4",
          color: "#000",
          transition: "all .3s ease-in-out"
        },
        "&$focused": {
          backgroundColor: "#fff",
          border: "2px solid #000"
        }
      }
    },

    //Text Input Labels
    MuiInputLabel: {
      root: {
        color: "#fff",
        fontFamily: '"Montserrat", sans-serif',
        fontWeight: "600",
        fontSize: ".9rem",
        "&$focused": {
          color: "#8a2be2",
          fontSize: "1rem"
        },
        "&$outlined": {
          fontWeight: "600",
          color: "#fff",
          "&$shrink": {
            top: "-12px",
            left: "-8px",
            color: "#fff",
            fontSize: "1.2rem",
            fontWeight: "600"
          },
          "&$focused": {
            color: "#8a2be2"
          }
        }
      }
    },

    //Dialog
    MuiDialog: {
      root: {
        backdropFilter: "blur(4px)"
      },
      paper: {
        padding: "16px"
      }
    },
    MuiDialogTitle: {
      root: {
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 600,
        fontSize: "24px"
      }
    },
    MuiDialogContent: {
      root: {
        width: "500px",
        paddingTop: 0
      }
    },
    MuiDialogContentText: {
      root: {
        color: "#333"
      }
    },
    MuiDialogActions: {
      root: {
        marginTop: "8px"
      }
    },

    //Expansion Panel
    MuiExpansionPanel: {
      root: {
        position: "inital",
        border: "none",
        boxShadow: "none"
      }
    },
    MuiExpansionPanelSummary: {
      root: {
        padding: 0,
        margin: 0
      }
    },
    MuiExpansionPanelDetails: {
      root: {
        padding: 0
      }
    },

    MuiFormControlLabel: {
      root: {
        marginLeft: 0
      }
    },

    // radio button group title
    MuiFormLabel: {
      root: {
        paddingBottom: 10,
        fontSize: "18px",
        fontWeight: "bold",
        color: "white",
        fontFamily: "'Montserrat', sans-serif",
        "&$focused": {
          color: "#8a2be2"
        }
      }
    },
    MuiRadio: {
      root: {
        color: "#fff"
      }
      // checked: {
      //   color: "red"
      // }
    },

    //Checkbox
    MuiCheckbox: {
      root: {
        marginRight: "16px",
        color: "transparent",
        borderRadius: 10,
        width: 26,
        height: 26,

        boxShadow: "none",
        backgroundColor: "#F1F1F2",
        transition: "all .2s ease-in-out",
        "&$colorPrimary": {
          "&$checked": {
            color: "#fff",
            background: "#000",
            "&:hover": {
              backgroundColor: "#000",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)"
            }
          },
          "&:hover": {
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)"
          }
        }
      }
    },

    //Checkbox icon
    MuiIconButton: {
      root: {
        fontSize: ".7rem",
        padding: "8px"
      }
    },

    MuiSlider: {
      root: {
        margin: "0 24px",
        padding: "20px 0"
      }
    },

    MuiListItem: {
      root: {
        color: "#333"
      }
    },

    //Tooltip
    MuiTooltip: {
      tooltip: {
        backgroundColor: "#333",
        fontSize: 13
      }
    },

    MuiPaper: {
      elevation1: {
        boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
        border: "none",
        // background:
        //   "-3px -3px 7px #ffffffa6, 3px 3px 5px rgba(94, 104, 121, 0.712)",
        borderRadius: 16
      }
    },

    MuiButton: {
      root: {
        borderRadius: 4,
        height: 50,
        textTransform: "none",
        fontFamily: "'Montserrat', sans-serif",
        boxShadow: "none",
        transition: "all .2s ease-in-out",
        "&$contained": {
          width: "180px",
          height: "50px",
          borderRadius: 0,
          backgroundColor: "white",
          color: "black",
          fontWeight: "600",
          "&:hover": {
            transition: "all .2s ease-in-out",
            boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.25)"
            // background: "#8a2be2"
          }
        },
        "&$outlined": {
          height: 50,
          color: "#fff",
          fontWeight: "600",
          border: "2px solid #333",
          background: "#333",
          "&$disabled": {
            background: "rgba(51, 51, 51, 0.3)",
            border: "none"
          },
          "&:hover": {
            opacity: "0.9",
            transition: "all .2s ease-in-out"
          }
        }
      }
    }
  }
});

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,

  document.getElementById("root")
);
