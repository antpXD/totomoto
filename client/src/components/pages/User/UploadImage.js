import React, { useContext, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

import { useDropzone } from "react-dropzone";
import OfferContext from "../../../context/offer/offerContext";
import AlertContext from "../../../context/alert/alertContext";

const dropzone = {
  marginTop: "40px",
  borderWidth: "2px",
  borderColor: "#cfcfcf",
  borderStyle: "dashed",
  borderRadius: "10px",
  height: "125px",
  padding: "40px 40px",
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: "500",
  textAlign: "center",
  color: "#cfcfcf",
  outline: "0",
  transition: "border .24s ease-in-out",
  cursor: "pointer"
};

const activeStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744"
};

const UploadImage = ({ setFiles, files, isUploaded, setIsUploaded }) => {
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
    <div key={file.name} className="thumbs__thumb" onClick={removeFile(file)}>
      <img src={file.preview} className="thumbs__image" alt={file.name} />
      <div className="thumbs__image-overlay">
        <div className="thumbs__image-overlay-x">
          <button>
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
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
      {(!isUploaded || files.length <= 0) && (
        <div {...getRootProps({ style })} className="thumbs__dropzone">
          <input {...getInputProps()} />
          {files.length > 0 ? (
            <p style={{ fontSize: "16px" }}>Add more images</p>
          ) : (
            <p style={{ fontSize: "16px" }}>Upload images (at least 5)</p>
          )}
          {isDragReject && (
            <p className="text-error">Only images will be uploaded</p>
          )}
        </div>
      )}
      <div className="thumbs__container">{thumbs}</div>
      {files.length > 0 && isUploaded ? (
        <div className="underline" onClick={onClear}>
          <p>Change your photos</p>
        </div>
      ) : null}
      {files.length > 0 && !isUploaded ? (
        <div className="flex-row center-horizontally">
          <div className="underline" onClick={onSubmit}>
            <p>Upload</p>
          </div>
          <div className="underline" onClick={onClear}>
            <p>Clear</p>
          </div>
        </div>
      ) : null}
    </section>
  );
};

UploadImage.propTypes = {
  files: PropTypes.array.isRequired,
  setFiles: PropTypes.func.isRequired
};

export default UploadImage;
