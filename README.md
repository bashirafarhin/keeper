# Keeper - Notes Management Full stack project

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)
- [Environment Variables](#environment-variables)
- [License](#license)

## Overview
Keeper is a secure and full stack MERN application for managing personal notes. It provides comprehensive note-taking functionality with user authentication and data persistence.
![Image](https://github.com/user-attachments/assets/58872cf9-541a-44e7-b10b-d85ed87268d2)
![Image](https://github.com/user-attachments/assets/ef1b8ce1-1dfd-458c-8fbe-1c67a2b8573b)

## Features
- authentication using local login and using google oaouth
- authorization using jsonwebtoken
- CRUD operations of notes
- responsive design
- changing background

## Tech Stack
### Frontend
- react: for creating UI the tntirement of the react is vite
- react-router-dom: for navigation
- axios: for creating APIs
- bootstrap: for some prebuild component
- react mui: for some prebuild component
- HTML, css and js for styling structuring
### Backend
- Node.js: Server-side runtime environment.
- Express: Web framework for building the REST API.
- MongoDB: NoSQL database for storing user information and notes.
- bcrypt: Password hashing for security.
- Authentication: jsonwebtoken

## Prerequisites
basic knowledge of mern stack and jsonwebtoken and google developer console

## Installation
#### Start Frontend
1. Clone the Repository
```bash
git clone https://github.com/bashirafarhin/keeper.git
```

2. Navigate to the Project Directory
```bash
cd keeper/client
```
3. Install Frontend Dependencies
```bash
npm install
```

4. Configure Frontend Environment Variables
- Create a `.env` file in the client directory
- Copy the contents from `.SampleEnvFile.txt` present in client folder and fill it with your credentials

5. Start Frontend Development Server
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`

#### Start Backend

1. On a new terminal, Navigate to Server Directory
```bash
cd keeper/server
```

2. Install Backend Dependencies
```bash
npm install
```

3. Configure Backend Environment Variables
- Create a `.env` file in the server directory
- Copy the contents from `.SampleEnvFile.txt` present in server folder and fill it with your credentials

4. Start Backend Server
```bash
nodemon index.js
```
The backend server will run on `http://localhost:8000`

## API Documentation

#### **Notes**:

- All routes requiring authentication expect a valid token to be sent in the `Authorization` header as `Bearer <jwt-token>`.
- **Headers:**

```json
{
  "Authorization": "Bearer <jwt-token>"
}
```

#### **Register User**

**POST /register**

**Request:**

```json
{
  "email": "user@example.com",
  "password": "userPassword123"
}
```

**Response:**

- 201 Created:

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "email": "user@example.com",
    "notes": ["consist notes objects"],
    "backgroundImageIndex": 0
  }
}
```

#### **Login User**

**POST /login**

**Request:**

```json
{
  "email": "user@example.com",
  "password": "userPassword123"
}
```

**Response:**

- 200 Created:
```json
{
  "token": "<jwt-token>",
  "user": {
  "_id": "<user-id>",
  "email": "user@example.com",
  "notes": ["consist notes objects"],
  "backgroundImageIndex": 0
  }
}
```

#### **Register User Using Google**

**POST /registerGoogle**

**Request:**

```json
{
  "email": "user@example.com"
}
```

**Response:**

- 201 Created:
```json
{
  "token": "<jwt-token>",
  "user": {
  "_id": "<user-id>",
  "email": "user@example.com",
  "notes": ["consist notes objects"],
  "backgroundImageIndex": 0
  }
}
```

#### **Login Using Google**

**POST /loginGoogle**

**Request:**

```json
{
  "email": "john@doe.gmail.com"
}
```

**Response:**

- 200 OK:
```json
{
  "token": "<jwt-token>",
  "user": {
  "_id": "<user-id>",
  "email": "user@example.com",
  "notes": ["consist notes objects"],
  "backgroundImageIndex": 0
  }
}
```

#### **Logout User**

**GET /logout**
- Requires token in the header for authorization

**Response:**

- 200 OK:
```json
 { "message": "Logged Out Successfully" }
```

#### **Delete User Account**

**DELETE /deleteAccount**
- Requires token in the header for authorization

**Response:**

- 200 OK:
```json
 { "message": "Account Deleted Successfully" }
```

#### **Create a note**

**POST /user/addNote**
- Requires token in the header for authorization

**Request:**

```json
{
  "title": "title",
  "content": "content"
}
```

**Response:**

- 201 Created:
```json
{
  "note": {
    "_id": "63b12f4c8c2a5b2f4f123abc",
    "title": "Sample Title",
    "content": "Sample Content"
  },
 "message": "Added note successfully."
}
```

#### **Update a note**

**PUT /user/updateNote/:id**
- id represents mongodb id of the note in the database
- Requires token in the header for authorization

**Request:**

```json
{
  "title": "title",
  "content": "content"
}
```

**Response:**

- 200 Created:
```json
{
 "message": "Updated note successfully."
}
```

#### **Update the background**

**POST /user/updateBackground**
- Requires token in the header for authorization

**Request:**

```json
{
  "index": "index"
}
```

**Response:**

- 200 Created:
```json
{
 "message": "Updated background successfully."
}
```

#### **Delete a note**

**DELETE /user/deleteNote/:id**
- id represents mongodb id of the note in the database
- Requires token in the header for authorization

**Request:**

**Response:**

- 200 Created:

```json
{
 "message": "Note deleted successfully"
}
```

#### **Gets user profile**

**GET /profile**
- Requires token in the header for authorization

**Response:**

- 200 Created:
```json
 {
 "user": {
  "_id": "<user-id>",
  "email": "user@example.com",
  "notes": ["contains notes object"],
  "backgroundImageIndex": "default background index or user defined"
  }
 }
 ```

---

## Error Handling

Common Errors:

- 400 Bad Request:
  ```json
  { "message": "Invalid input, Custom message will be shown" }
  ```
- 401 Unauthorized:
  ```json
  { "message": "Unauthorized" }
  ```
- 500 Internal Server Error:
  ```json
  { "message": "Something went wrong." }
  ```



#### Some Error Images

<!-- ![Image](https://github.com/user-attachments/assets/4b20dcc4-47c7-4345-a7d8-d1fea97c714f)
![Image](https://github.com/user-attachments/assets/1f48b8eb-cdb4-4fde-98ee-7bdc5a94acb8)
![Image](https://github.com/user-attachments/assets/86635245-9f9b-4b2c-aa7e-041f63466bde)
![Image](https://github.com/user-attachments/assets/dfd084ae-9e31-4eda-af86-04637898cbd3)
![Image](https://github.com/user-attachments/assets/edef8574-ea36-4217-a248-b9f17e0037c5)
![Image](https://github.com/user-attachments/assets/68847517-c70b-4504-b32a-d8236fbfab57) -->
<p align="center">
  <img src="https://github.com/user-attachments/assets/4b20dcc4-47c7-4345-a7d8-d1fea97c714f" width="45%">
  <img src="https://github.com/user-attachments/assets/1f48b8eb-cdb4-4fde-98ee-7bdc5a94acb8" width="45%">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/86635245-9f9b-4b2c-aa7e-041f63466bde" width="45%">
  <img src="https://github.com/user-attachments/assets/dfd084ae-9e31-4eda-af86-04637898cbd3" width="45%">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/edef8574-ea36-4217-a248-b9f17e0037c5" width="45%">
  <img src="https://github.com/user-attachments/assets/68847517-c70b-4504-b32a-d8236fbfab57" width="45%">
</p>



## Environment Variables

#### Client
```env
VITE_BACKEND_URL=
VITE_GOOGLE_CLIENT_ID=
```

#### Server
```env
FRONTEND_URL=http://localhost:5173
GOOGLE_PASSWORD_SECRET=
GOOGLE_DEFAULT_PASSWORD='google'(you can enter any random string)
MONGODB_URL=mongodb://127.0.0.1:27017/keeper(if connecting locally)
JWT_SECRET=secret(you can enter any random string)
```

## License
[MIT License](https://github.com/bashirafarhin/keeper/tree/main?tab=MIT-1-ov-file)
