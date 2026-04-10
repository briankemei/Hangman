# Hangman Game (Full Stack: React + Node + DynamoDB + Docker)

## Description

This is a **full-stack Hangman game** built using:

- React (Vite) for the frontend  
- Node.js + Express for the backend  
- DynamoDB Local (Docker) for database storage  
- Docker Compose to run the entire system  

Players can log in, play the game, and have their **wins/losses tracked and persisted**.

---

##  Features

### Game Features
- Display hangman image based on mistakes
- Select letters from A–Z
- Disable already selected letters
- Show current guessed word
- Show chosen letters
- New Game button
- Win / Lose popup

### Player Features
- Player login system
- Create new player if not found
- Track wins and losses
- Display win percentage
- Persist player stats in database

### API Features
- `GET /api/players/:name` → fetch player
- `POST /api/players` → create player
- `PUT /api/players/:name` → update stats

## React Concepts Used

- Components (App, HangmanImage, WordDisplay, etc.)
- Props (data passed between components)
- State (game + player data)
- Event handling (button clicks)
- Conditional rendering (login/game/stats)
- useEffect (trigger updates after game ends)

---

## Backend Concepts Used

- REST API (Express)
- AWS SDK v3 (DynamoDB)
- Controllers + Routes architecture
- Async/Await for API calls
- Error handling

---

## Database (DynamoDB Local)

- Runs inside Docker
- Stores:
  - player name
  - wins
  - losses
- Uses persistent storage via Docker volume

---

## Game Logic

- Player starts with **5 lives**
- Each wrong guess reduces a life
- Correct guesses reveal letters
- Game ends when:
  - All letters guessed → WIN
  - Lives reach 0 → LOSE
- Player stats update after each game

---

## Run the Full App (Docker Compose)

### One Command Setup

```bash
docker compose up --build
