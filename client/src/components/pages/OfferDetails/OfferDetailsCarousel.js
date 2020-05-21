import React, { Component } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const bigSliderSettings = {
  className: "big-slider",
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const smallSliderSettings = {
  speed: 500,
  slidesToShow: 5,
  infinite: true,
  swipeToSlide: true,
  focusOnSelect: true,
};

export default class OfferDetailsCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  render() {
    return (
      <>
        <div className="carousel-container">
          <div className="big-carousel">
            <Slider
              {...bigSliderSettings}
              asNavFor={this.state.nav2}
              ref={(slider) => (this.slider1 = slider)}
            >
              {this.props.images.map((image, index) => (
                <div key={index}>
                  <img src={image.fileUrl} className="carousel-image" alt="" />
                </div>
              ))}
            </Slider>
          </div>
          <div className="small-carousel">
            <Slider
              {...smallSliderSettings}
              asNavFor={this.state.nav1}
              ref={(slider) => (this.slider2 = slider)}
            >
              {this.props.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image.fileUrl}
                    className="carousel-image small"
                    alt=""
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </>
    );
  }
}

OfferDetailsCarousel.propTypes = {
  images: PropTypes.array.isRequired,
};
