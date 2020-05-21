import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Parallax } from "react-scroll-parallax";
import { CSSTransition } from "react-transition-group";

function NextArrow(props) {
  return (
    <i
      className="fas fa-chevron-right carousel-arrow--next"
      onClick={props.onClick}
    />
  );
}

function PrevArrow(props) {
  return (
    <i
      className="fas fa-chevron-left carousel-arrow--prev"
      onClick={props.onClick}
    />
  );
}

const heroSliderSettings = {
  className: "hero-slider",
  autoplay: true,
  autoplaySpeed: 5000,
  dots: true,
  fade: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  customPaging: (i) => <i className="fas fa-circle-notch slider-dot" />,
};

const HomeCarousel = ({ offers }) => {
  return (
    <div className="carousel-container hero-slider">
      {offers && (
        <Slider {...heroSliderSettings}>
          {offers.slice(0, 5).map((offer, index) => (
            <div key={index}>
              <CSSTransition
                in={true}
                appear={true}
                timeout={800}
                classNames="zoomOut"
              >
                <Parallax y={[-28, 20]} tagOuter="figure">
                  <img
                    src={offer.image[0].fileUrl}
                    className="hero-image"
                    alt={offer.make}
                  />
                </Parallax>
              </CSSTransition>

              <div className="slider-text__box">
                <div className="slider-text__container">
                  <div className="slider-text__header slider-text__header--small">
                    Newest offers
                  </div>
                  <Link className="" to={`/offer/${offer._id}`}>
                    <div className="underline-header">
                      <p>
                        {offer.make.charAt(0).toUpperCase() +
                          offer.make.slice(1)}{" "}
                        {offer.model.charAt(0).toUpperCase() +
                          offer.model.slice(1)}
                      </p>
                    </div>
                  </Link>

                  <div className="slider-text__details">
                    {offer.year} | {offer.fuelType} | {offer.condition} |{" "}
                    {offer.mileage}
                  </div>
                  <Link
                    className="slider-text__link"
                    to={`/offer/${offer._id}`}
                  >
                    See offer...
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

HomeCarousel.propTypes = {
  offers: PropTypes.array.isRequired,
};

export default HomeCarousel;
