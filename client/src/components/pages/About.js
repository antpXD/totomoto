import React from "react";
import { CSSTransition } from "react-transition-group";

const About = () => {
  const array2 = [
    { nazwa: "siema", id: "1", magazyn: "123321" },
    { nazwa: "elo", id: "2", magazyn: "bvcx" },
    { nazwa: "XD", id: "3", magazyn: "xxx" },
    { nazwa: "eeeee", id: "4", magazyn: "rewqr" }
  ];

  let arr = [];

  const handleAction = obiekt => {
    arr.push(obiekt);
    console.log(arr);
  };

  const handleClear = () => {
    arr = [];
  };

  return (
    <CSSTransition in classNames="fade" appear={true} timeout={1000}>
      <>
        {array2.map(obiekt => (
          <div>
            <p style={{ color: "white" }}>{obiekt.nazwa}</p>
            <button onClick={() => handleAction(obiekt)}>dodaj</button>
          </div>
        ))}
        <div style={{ color: "white" }}>
          {arr.map(obj => (
            <div>{obj.nazwa}</div>
          ))}
        </div>
        <button onClick={handleClear}>wyczysc tabele</button>
      </>
    </CSSTransition>
  );
};

export default About;
