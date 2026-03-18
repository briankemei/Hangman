import React from "react";

// import images
import hangman0 from "../assets/hangman0.png";
import hangman1 from "../assets/hangman1.png";
import hangman2 from "../assets/hangman2.png";
import hangman3 from "../assets/hangman3.png";
import hangman4 from "../assets/hangman4.png";
import hangman5 from "../assets/hangman5.png";

// store images
const images = [
  hangman0,
  hangman1,
  hangman2,
  hangman3,
  hangman4,
  hangman5
];

function HangmanImage({ mistakes }) {

  return (
    <div className="hangman-image">
      <img src={images[mistakes]} alt="Hangman status" />
    </div>
  );

}

export default HangmanImage;