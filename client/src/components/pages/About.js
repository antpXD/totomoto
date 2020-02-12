import React, { useState, useEffect } from "react";
import Home from "./Home/Home";

const About = () => {
  const [offset, setOffset] = useState(0);

  const parallaxShift = () => {
    setOffset(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", parallaxShift);
  }, [offset]);

  // componentWillUnmount() {
  //   window.removeEventListener("scroll", this.parallaxShift);
  // }

  return (
    <div>
      <header
        className="header-background"
        style={{ backgroundPositionY: offset }}
      >
        <section className="info-container" style={{ bottom: offset / 2 }}>
          <h1>Kevin Simpson</h1>
          <h3>Front End Developer</h3>
        </section>
      </header>
      <Home />
    </div>
  );
};

export default About;
