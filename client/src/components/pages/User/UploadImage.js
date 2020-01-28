import React, { useContext, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

import { useDropzone } from "react-dropzone";
import OfferContext from "../../../context/offer/offerContext";
import AlertContext from "../../../context/alert/alertContext";

import { Button, makeStyles } from "@material-ui/core";
import Fade from "react-reveal/Fade";

const dropzone = {
  backgroundColor: "#fff",
  borderWidth: "2px",
  borderColor: "#e9ebeb",
  borderStyle: "dashed",
  borderRadius: "10px",
  height: "125px",
  padding: "40px 40px",
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: "500",
  textAlign: "center",
  color: "#a8a8a8",
  outline: "0",
  transition: "border .24s ease-in-out",
  cursor: "pointer"
};

const activeStyle = {
  color: "#333",
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744"
};

const useStyles = makeStyles(theme => ({
  removeBtn: {
    position: "absolute",
    border: "none",
    boxShadow: "none",
    borderRadius: "50%",
    right: "-5px",
    top: "-9px",
    width: "25px",
    height: "25px",
    backgroundColor: "white",
    zIndex: "99",
    cursor: "pointer",
    transition: "all .1s ease-in-out",
    "&:hover": {
      fontSize: "1.04rem",
      transition: "all .1s ease-in-out"
      // boxShadow: "0px 7px 10px rgba(0, 0, 0, 0.15)"
    }
  },
  thumbsContainer: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: 10,
    marginTop: 16
  },
  thumb: {
    marginBottom: 8,
    marginRight: 8,
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    position: "relative"
  },
  thumbImg: {
    width: "220px",
    height: "120px",
    borderRadius: 8,
    objectFit: "cover"
  }
}));

const UploadImage = ({ setFiles, files, isUploaded, setIsUploaded }) => {
  const classes = useStyles();
  const offerContext = useContext(OfferContext);
  const { addImage, clearImage } = offerContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  // i dont know why it doesnt work without this
  // eslint-disable-next-line
  const previewFiles = files.map(file =>
    Object.assign(file, { preview: URL.createObjectURL(file) })
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: "image/*",
    onDrop: acceptedFiles => {
      // files that are already dropped (in the files state)
      const prevFiles = files.map(file =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      // previous files + files that are being dropped
      const allFiles = [...prevFiles, ...acceptedFiles];
      setFiles(
        allFiles.map(
          file =>
            new File([file], `${+new Date()}_${file.size}`, { type: file.type })
        )
      );
    }
  });
  const style = useMemo(
    () => ({
      ...dropzone,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  //removing previewed files from state
  const removeFile = file => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const thumbs = files.map(file => (
    <Fade key={file.name}>
      <div className={classes.thumb}>
        <img src={file.preview} className={classes.thumbImg} alt={file.name} />
        <button onClick={removeFile(file)} className={classes.removeBtn}>
          <i className="fas fa-times" style={{ padding: 0, color: "#000" }}></i>
        </button>
      </div>
    </Fade>
  ));

  useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const onSubmit = e => {
    e.preventDefault();
    if (files.length > 4) {
      files.forEach(file => {
        const formData = new FormData();
        formData.append("image", file);
        addImage(formData);
      });
      setAlert("Files Uploaded", "success");
      setIsUploaded(true);
    } else {
      setAlert("You have to upload at least 5 images", "error");
    }
  };

  const onClear = () => {
    clearImage();
    setFiles([]);
    setIsUploaded(false);
  };

  return (
    <section>
      <div className={classes.thumbsContainer}>{thumbs}</div>
      {files.length > 0 && isUploaded ? (
        <Button onClick={onClear}>Change your photos</Button>
      ) : null}
      {files.length > 0 && !isUploaded ? (
        <>
          <Button onClick={onSubmit}>Upload</Button>
          <Button onClick={onClear}>Clear</Button>
        </>
      ) : null}

      {!isUploaded && (
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          {files.length > 0 ? (
            <p>or add some more</p>
          ) : (
            <p>Upload images (at least 5)</p>
          )}

          {isDragReject && (
            <p className="text-error">Only images will be uploaded</p>
          )}
        </div>
      )}
    </section>
  );
};

UploadImage.propTypes = {
  files: PropTypes.array.isRequired,
  setFiles: PropTypes.func.isRequired
};

export default UploadImage;
