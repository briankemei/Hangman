# Hangman Game (React + Vite + Docker)
## Description

This is a Hangman game built using React. The user guesses letters to reveal a hidden word before running out of lives. The game updates the UI dynamically based on user input.
## Features
Display hangman image based on mistakes
Select letters from A–Z
Disable already selected letters
Show current guessed word
Show chosen letters
New Game button
Win / Lose popup

## React Concepts Used
Components (App, HangmanImage, WordDisplay, etc.)
Props (data passed from parent to child)
State (game data like word, guesses, lives)
Event handling (button clicks)
Conditional rendering (win/lose display)
Lists and keys (alphabet buttons)

## Game Logic
Player starts with 5 lives
Each wrong guess reduces a life
Correct guesses reveal letters
Game ends when:
All letters are guessed → WIN
Lives reach 0 → LOSE

## Run the Project (Vite)
Install dependencies:
npm install
Start development server:

  npm run dev

  Open in browser:

  http://localhost:5173
