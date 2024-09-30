# Keeper - Notepad Full Stack MERN Application
Keeper is a full-stack notepad application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to securely manage notes, change backgrounds, and handle accounts with encrypted authentication and sessions. The app is responsive and provides seamless navigation, making it an ideal solution for users who want to keep their notes organized.

![Screenshot 2024-09-30 212815](https://github.com/user-attachments/assets/5cb0572b-430a-419c-bc6e-45bfd157c433) ![Screenshot 2024-09-30 212828](https://github.com/user-attachments/assets/483cb1d9-bd8c-41e6-8c2c-aa349bf7576d) ![Screenshot 2024-09-30 212741](https://github.com/user-attachments/assets/6e649a2e-158c-4ff5-882d-45f3ac1b1ac6) ![Screenshot 2024-09-30 221836](https://github.com/user-attachments/assets/2eb542c7-87d0-46f0-82af-27e8aea50684)

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

## Installation
 * Clone the repository:
    `git clone https://github.com/bashirafarhin/keeper.git`
    `cd keeper`
 * Install dependencies:
    * Backend:
      `cd backend`
      `npm install`
   * Frontend:
      `cd backend`
      `npm install`
* Set up environment variables: Create a .env file in the backend folder with the following variables:
  * FRONTEND_URL= "http://localhost:5173"
  * GOOGLE_PASSWORD_SECRET=
  * MONGODB_URL=
  * SALT_ROUNDS=
  * SESSION_SECRET=
* Set up environment variables: Create a .env file in the frontend folder with the following variables:
  * VITE_BACKEND_URL= "http://localhost:3000"
  * VITE_GOOGLE_CLIENT_ID=
for the unfilled variables you should know about sessions, google auth( from [Passport Js](https://www.passportjs.org/))
* Run the application:
   * Backend:
     `cd backend`
     `npm start`
   * Frontend:
     `cd frontend`
     `npm run dev`
* Visit `http://localhost:5173` to use the Keeper app.

## App Deployment

This application is deployed on [Render's](https://render.com/) free tier, which may result in slower performance due to the cold start process. Free-tier servers are put to sleep after periods of inactivity (around 30 minutes), and waking them up can take approximately 30 seconds. This may cause the app to load more slowly initially.

## Reporting Issues and Contact

I'm continuously learning and improving, so if you encounter any bugs, issues, or have suggestions, feel free to reach out!.
If you find a bug , please open an issue on the GitHub repository by navigating to the Issues tab. I'll do my best to address them as quickly as possible.
You can also connect with me and report any issues via my [LinkedIn Profile](https://www.linkedin.com/in/bashira-farhin-62603822b/).
