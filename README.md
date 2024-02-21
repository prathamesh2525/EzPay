# EzPay

EzPay is a full-stack web application built with React on the frontend and a backend API built with NodeJS on the backend. It allows users to manage their account balance, send money to other users, and view transaction history. It includes features such as authentication, a dashboard to display user balance and other users, and a modal for sending money.

## Features

- **Authentication:** Users can sign in and sign up securely using email and password.
- **Dashboard:** View account balance and a list of other users available for money transfers.
- **Send Money Modal:** Initiate money transfers by entering the recipient and amount in a modal.
<!-- - **Transaction History:** Users can view their transaction history. -->

## Technologies Used

### Frontend:

- **React:** The front-end is built using React to create a dynamic and responsive user interface.
- **React Router:** Enables navigation between different pages in the application.
- **Tailwind CSS:** Provides styling and layout utility classes for a clean and responsive design.
- **Axios:** Handles HTTP requests to interact with the backend API.

### Backend:

- **NodeJS:** The backend is built using NodeJS, providing API endpoints for user authentication, account management, and money transfers.
- **MongoDB:** MongoDB, is used to store user data and transaction history.

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/prathamesh2525/EzPay
   ```

2. **Install Dependencies:**

   Frontend:

   ```bash
   cd EzPay
   cd frontend
   npm i
   npm run dev
   ```

   Backend:

   ```bash
   cd EzPay
   cd backend
   npm install
   npm start
   ```

3. **Run the Application :**

   ```bash
   npm start
   ```

# MongoDB Replica Set Docker Setup

This repository provides a Dockerfile to set up a MongoDB replica set. Follow the steps below to get started.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine.

## Setup Instructions

```bash
docker build -t my-mongodb .
docker run -d -p 27017:27017 --name my-mongodb-instance my-mongodb
docker logs my-mongodb-instance

```
