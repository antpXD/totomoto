import React from "react";
import Error404 from "../../images/Error404.gif";

const NotFound = () => {
  return (
    <>
      <div className="container">
        <div className="all-center not-found">
          <img src={Error404} alt="Logo" />;
        </div>
      </div>
    </>
  );
};

export default NotFound;
