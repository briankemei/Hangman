import React from "react";

// import images
import hangman0 from "./assets/arm.png";
import hangman1 from "./assets/botharms.png";
import hangman2 from "./assets/Dead.png";
import hangman3 from "./assets/leg.png";
import hangman4 from "./assets/noose.png";
import hangman5 from "./assets/upperbody.png";
import hangman6 from "./assets/upperandlowerbody.png";

// store images
const images = [
  hangman0,
  hangman1,
  hangman2,
  hangman3,
  hangman4,
  hangman5,
  hangman6
];

function HangmanImage({ mistakes }) {

  return (
    <div className="hangman-image">
      <img src={images[mistakes]} alt="Hangman status" />
    </div>
  );

}

export default HangmanImage;