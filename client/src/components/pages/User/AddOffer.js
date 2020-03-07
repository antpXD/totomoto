import React, { useState, useContext, useEffect } from "react";
import clsx from "clsx";

// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import UploadImage from "./UploadImage";

import OfferContext from "../../../context/offer/offerContext";
import AlertContext from "../../../context/alert/alertContext";
import AuthContext from "../../../context/auth/authContext";

import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  marginTop: {
    marginTop: theme.spacing(5),
    minWidth: 120
  },
  marginLeft: {
    marginLeft: theme.spacing(2)
  },
  marginRight: {
    marginRight: theme.spacing(2)
  },
  lightColor: {
    color: "#B7B7B7"
  },
  addOfferButton: {
    width: "180px"
  },
  editOfferButton: {
    width: "180px"
  }
}));

const AddOffer = ({ toggle }) => {
  const classes = useStyles();

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const userEmail = user && user.email;

  const offerContext = useContext(OfferContext);

  const {
    addOffer,
    updateOffer,
    current,
    clearCurrent,
    uploadedFiles,
    clearImage
  } = offerContext;

  const INITIAL_STATE = {
    image: uploadedFiles,
    bodyType: "",
    make: "",
    model: "",
    condition: "",
    year: "",
    fuelType: "",
    engineSize: "",
    enginePower: "",
    mileage: "",
    price: "",
    description: "",
    email: userEmail
  };

  useEffect(() => {
    if (current !== null) {
      uploadedFiles.length > 0
        ? SetOffer({
            ...current,
            image: uploadedFiles
          })
        : SetOffer({
            ...current
          });
    } else {
      SetOffer(INITIAL_STATE);
    }
    // eslint-disable-next-line
  }, [offerContext, current, uploadedFiles, userEmail]);

  const [offer, SetOffer] = useState(INITIAL_STATE);
  const [files, setFiles] = useState([]);
  // chceck if images are uploaded
  const [isUploaded, setIsUploaded] = useState(null);

  const {
    make,
    email,
    model,
    bodyType,
    price,
    mileage,
    year,
    fuelType,
    engineSize,
    enginePower,
    condition,
    description
  } = offer;

  const onChange = e => {
    SetOffer({
      ...offer,
      [e.target.name]: e.target.value
    });
  };

  function isEmpty(object) {
    for (const property in object) {
      if (object[property] === "") return false;
    }
    return true;
  }

  const onSubmit = e => {
    e.preventDefault();
    if (!isEmpty(offer)) {
      setAlert("Fill in all fields", "error");
    } else if (current === null) {
      addOffer(offer);
      setAlert("Your offer has been added successfully!", "success");
      setFiles([]);
    } else {
      updateOffer(offer);
      setAlert("Your offer has been edited successfully!", "success");
      clearAll();
    }
    toggle();
    SetOffer(INITIAL_STATE);
    clearImage();
    setIsUploaded(false);
  };

  const clearAll = () => {
    clearCurrent();
    clearImage();
    setFiles([]);
    toggle();
  };

  return (
    <div className="add-offer__section">
      <div className="container">
        {/* <div className="header-section">
            <h1 className="header-section__text">Your contact.</h1>
            <p style={{ paddingTop: 10, color: "white" }}>{email}</p>
          </div> */}

        <div className="add-offer__flex-container">
          <div className="add-offer__item-center">
            <div className="flex-row">
              <TextField
                variant="outlined"
                name="make"
                value={make}
                label="Make"
                onChange={onChange}
                className={clsx(classes.marginTop, classes.marginRight)}
                fullWidth={true}
              />
              <TextField
                variant="outlined"
                name="model"
                value={model}
                label="Model"
                onChange={onChange}
                className={clsx(classes.marginTop, classes.marginLeft)}
                fullWidth={true}
              />
            </div>

            <FormControl
              variant="outlined"
              className={classes.marginTop}
              fullWidth
            >
              <InputLabel htmlFor="body-type">Body Type</InputLabel>
              <Select
                value={bodyType}
                onChange={onChange}
                inputProps={{
                  name: "bodyType",
                  id: "body-type"
                }}
              >
                <MenuItem disabled value="">
                  Choose body type
                </MenuItem>
                <MenuItem value="Car">Car</MenuItem>
                <MenuItem value="Motorcycle">Motorcycle</MenuItem>
                <MenuItem value="Truck">Truck</MenuItem>
                <MenuItem value="Van">Van</MenuItem>
              </Select>
            </FormControl>

            <FormControl component="fieldset" className={classes.marginTop}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="condition"
                name="condition"
                value={condition}
                onChange={onChange}
                row
              >
                <FormControlLabel
                  value="New"
                  control={<Radio color="secondary" />}
                  className={classes.lightColor}
                  label="New"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="Used"
                  control={<Radio color="secondary" />}
                  className={classes.lightColor}
                  label="Used"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="Damaged"
                  control={<Radio color="secondary" />}
                  className={classes.lightColor}
                  label="Damaged"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              type="number"
              variant="outlined"
              name="year"
              value={year}
              label="Year"
              onChange={onChange}
              className={classes.marginTop}
              fullWidth={true}
            />

            <FormControl
              variant="outlined"
              className={classes.marginTop}
              fullWidth
            >
              <InputLabel htmlFor="fuel-type">Fuel Type</InputLabel>
              <Select
                value={fuelType}
                onChange={onChange}
                inputProps={{
                  name: "fuelType",
                  id: "fuel-type"
                }}
              >
                <MenuItem disabled value="">
                  Choose fuel type
                </MenuItem>
                <MenuItem value="Petrol">Petrol</MenuItem>
                <MenuItem value="Diesel">Diesel</MenuItem>
                <MenuItem value="Electric">Electric</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
              </Select>
            </FormControl>
            <TextField
              type="number"
              variant="outlined"
              name="mileage"
              value={mileage}
              label="Mileage"
              onChange={onChange}
              className={classes.marginTop}
              fullWidth={true}
            />
            <div className="flex-row">
              <TextField
                type="number"
                variant="outlined"
                name="engineSize"
                value={engineSize}
                label="Engine Size"
                onChange={onChange}
                className={clsx(classes.marginTop, classes.marginRight)}
                fullWidth={true}
              />
              <TextField
                type="number"
                variant="outlined"
                name="enginePower"
                value={enginePower}
                label="Engine Power"
                onChange={onChange}
                className={clsx(classes.marginTop, classes.marginLeft)}
                fullWidth={true}
              />
            </div>
            <TextField
              variant="outlined"
              name="price"
              type="number"
              value={price}
              label="Price"
              onChange={onChange}
              className={classes.marginTop}
              fullWidth={true}
            />
          </div>
          <div className="add-offer__item-center flex-column center-horizontally">
            <UploadImage
              files={files}
              setFiles={setFiles}
              isUploaded={isUploaded}
              setIsUploaded={setIsUploaded}
            />
            <TextField
              variant="outlined"
              multiline
              rows="10"
              name="description"
              value={description}
              label="Description"
              onChange={onChange}
              className={classes.marginTop}
              fullWidth={true}
            />
          </div>
        </div>
        <div
          className="flex-row center-horizontally"
          style={{ padding: "40px 20px 80px 20px" }}
        >
          <div className="add-offer__contact">
            <span>Your e-mail to contact: </span>
            {email}
          </div>
          <div className="flex-row flex-end">
            <div
              className="underline"
              onClick={current ? clearAll : toggle}
              style={{ padding: "10px 30px 0 0" }}
            >
              <p>Cancel</p>
            </div>

            <div
              className={
                isEmpty(offer) &&
                (uploadedFiles.length > 4 || offer.image.length > 4)
                  ? "add-offer__animated-button"
                  : "add-offer__animated-button--disabled"
              }
              onClick={
                isEmpty(offer) &&
                (uploadedFiles.length > 4 || offer.image.length > 4)
                  ? onSubmit
                  : null
              }
            >
              <div className="animated-button-content">
                {current ? "update offer" : "add offer"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOffer;
