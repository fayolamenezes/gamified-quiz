# Gamified Quiz App

## Overview
The Gamified Quiz App is a React-based application that fetches quiz questions from an API and presents them to users. It includes a timed quiz with interactive answer selection, scoring, and a results page.

## Features
- Fetches quiz questions dynamically from an API.
- Timer-based questions.
- Randomized question and answer order.
- Speech synthesis for text-to-speech functionality.
- Color-coded answer feedback with sound effect(green for correct, red for incorrect).
- Skipping questions and moving to the next.
- Progress bar indicating quiz completion.
- Responsive UI with smooth transitions.

## Technologies Used
- React
- React Router
- JavaScript (ES6+)
- CSS (for styling)
- Fetch API (for data retrieval)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/fayolamenezes/quiz-app.git
   cd quiz-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
   The app will be available at `http://localhost:3000`.

## API Endpoint
The quiz data is fetched from an API endpoint using:
```js
const response = await fetch('/Uw5CrX');
```
Ensure the API is properly configured and accessible.

## Screenshots & Video Walkthrough
https://drive.google.com/drive/folders/1cANwvVu0BhDYz5U2UYgucZ4G6ebp6oDN?usp=sharing
### Video Playback Notice  
The video file may take longer than expected to process for online playback. If you experience issues, please download the file and watch it offline.

## Usage
1. Open the app and start the quiz.
2. Select an answer for each question within the given time limit.
3. Skip a question if needed.
4. View the final score on the results page.
