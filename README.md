# Keeper - Notepad Full Stack MERN Application
Keeper is a full-stack notepad application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to securely manage notes, change backgrounds, and handle accounts with encrypted authentication and sessions. The app is responsive and provides seamless navigation, making it an ideal solution for users who want to keep their notes organized.

![Screenshot 2024-09-30 213019](https://github.com/user-attachments/assets/401bb50d-f142-4ead-954d-a1aa73ad8432) ![Screenshot 2024-09-30 212741](https://github.com/user-attachments/assets/f2b5a0ae-da02-412a-a91d-e0030ae23649) ![Screenshot 2024-09-30 212815](https://github.com/user-attachments/assets/2dbe7040-65bc-413a-a77d-9c5cae7bafa2)
![Screenshot 2024-09-30 212828](https://github.com/user-attachments/assets/e4d6d8a7-cf0c-4015-a242-753fb5def6c0)
![Screenshot 2024-09-30 212931](https://github.com/user-attachments/assets/42b3b261-1b13-4114-b82e-2743b36a4833)

## Features
 * Add, Delete, and Update Notes: Users can create, modify, and delete notes easily.
 * User Authentication: Google Authentication: Sign in with your Google account.
 * Custom Authentication: Sign up, login, and manage accounts with password encryption using bcrypt.
 * Background Customization: Users can change the application's background to their preference.
 * Account Management: Users can delete their accounts securely.
 * Sessions & Cookies: User sessions are maintained using cookies, ensuring secure authentication and session handling.
 * Responsive Design: The app is fully responsive, providing a seamless experience on all devices.
 * Data Encryption: Passwords are securely encrypted using bcrypt for safe storage.
 * Routing: Smooth navigation throughout the app using React Router.
 * 
## Technologies Used
### Frontend
 * React: Handles UI and state management.
 * Material-UI (MUI): Provides modern, responsive components and styling.
 * React Router: Enables seamless routing and navigation.
 * Vite: A fast build tool and development server.
 * HTML, CSS, JavaScript: Used for structure, styling, and interactivity.
### Backend
 * Node.js: Server-side runtime environment.
 * Express: Web framework for building the REST API.
 * MongoDB: NoSQL database for storing user information and notes.
 * bcrypt: Password hashing for security.
 * Authentication: Google OAuth and local auth using passport
 * Sessions & Cookies: Secure session management.
 * 
## Installation
 * Clone the repository:
    `git clone https://github.com/yourusername/keeper.git`
    `cd keeper`
 * Install dependencies:
    * Backend:
      `cd backend`
      `npm install`
   * Frontend:
      `cd backend`
      `npm install`
* Set up environment variables: Create a .env file in the backend folder with the following variables:
* Set up environment variables: Create a .env file in the backend folder with the following variables:
* Run the application:
   * Backend:
     `cd backend`
     `npm start`
   * Frontend:
     `cd frontend`
     `npm run dev`
* Visit `http://localhost:5173` to use the Keeper app.
