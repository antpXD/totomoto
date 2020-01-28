import React, { useState, useContext, useEffect } from "react";
import clsx from "clsx";

// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import UploadImage from "./UploadImage";

import OfferContext from "../../../context/offer/offerContext";
import AlertContext from "../../../context/alert/alertContext";
import AuthContext from "../../../context/auth/authContext";

import {
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  marginTop: {
    marginTop: theme.spacing(5),
    minWidth: 120
  },
  marginTopBottom: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    minWidth: 120
  },
  marginLeft: {
    marginLeft: theme.spacing(2)
  },
  marginRight: {
    marginRight: theme.spacing(2)
  },
  primary: {
    width: "180px"
  },
  secondary: {
    width: "180px"
  }
}));

const AddOffer = () => {
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
    // console.log(e.target.name);
    SetOffer({
      ...offer,
      [e.target.name]: e.target.value
    });
  };

  // const onDescriptionChange = description => {
  //   // console.log(e.target.name);
  //   SetOffer({ ...offer, description: description });
  // };

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
    SetOffer(INITIAL_STATE);
    clearImage();
    setIsUploaded(false);
  };

  const clearAll = () => {
    clearCurrent();
    clearImage();
    setFiles([]);
  };

  return (
    <>
      <div className="form-container">
        <div>
          {current ? (
            <h1 className="section-title">
              <span className="text-dark-secondary">Edit</span>
              <span className="text-light">Offer</span>
            </h1>
          ) : (
            <h1 className="section-title">
              <span className="text-dark">Add</span>
              <span className="text-light">offer</span>
            </h1>
          )}
        </div>
        {/* <ImageUploader /> */}
        <UploadImage
          files={files}
          setFiles={setFiles}
          isUploaded={isUploaded}
          setIsUploaded={setIsUploaded}
        />

        <div className="flex-row">
          <TextField
            variant="outlined"
            name="make"
            value={make}
            label="Make"
            onChange={onChange}
            className={clsx(classes.marginTop, classes.marginRight)}
            fullWidth={false}
          />
          <TextField
            variant="outlined"
            name="model"
            value={model}
            label="Model"
            onChange={onChange}
            className={clsx(classes.marginTop, classes.marginLeft)}
            fullWidth={false}
          />
        </div>

        <FormControl variant="outlined" className={classes.marginTop} fullWidth>
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
          <h3>Condition</h3>
          <RadioGroup
            aria-label="condition"
            name="condition"
            value={condition}
            onChange={onChange}
          >
            <FormControlLabel
              value="New"
              control={<Radio color="primary" />}
              label="New"
              labelPlacement="end"
            />
            <FormControlLabel
              value="Used"
              control={<Radio color="primary" />}
              label="Used"
              labelPlacement="end"
            />
            <FormControlLabel
              value="Damaged"
              control={<Radio color="primary" />}
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

        <FormControl variant="outlined" className={classes.marginTop} fullWidth>
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
            fullWidth={false}
          />
          <TextField
            type="number"
            variant="outlined"
            name="enginePower"
            value={enginePower}
            label="Engine Power"
            onChange={onChange}
            className={clsx(classes.marginTop, classes.marginLeft)}
            fullWidth={false}
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
        <TextField
          variant="outlined"
          multiline
          name="description"
          value={description}
          label="Description"
          onChange={onChange}
          className={classes.marginTop}
          fullWidth={true}
        />

        {/* <div className="text-editor py-1">
          <ReactQuill
            theme="snow"
            value={description}
            onChange={onDescriptionChange}
          ></ReactQuill>
        </div> */}

        <h4 className={classes.marginTop}>Your contact email</h4>
        <p>{email}</p>
        <div className="flex-row flex-end">
          {current && (
            <div>
              <Button
                size="large"
                onClick={clearAll}
                className={clsx(classes.marginTopBottom, classes.marginRight)}
              >
                Cancel
              </Button>
            </div>
          )}

          <Button
            disabled={
              isEmpty(offer) &&
              (uploadedFiles.length > 4 || offer.image.length > 4)
                ? false
                : true
            }
            variant="outlined"
            size="large"
            className={clsx(
              classes.marginTopBottom,
              current ? classes.secondary : classes.primary
            )}
            onClick={onSubmit}
          >
            {current ? "Update Offer" : "Add Offer"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddOffer;
