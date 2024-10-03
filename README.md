## <a name="top"></a>

# Social Network API

---

![GitHub License](https://img.shields.io/github/license/TEMPTAG/Social-Network-API?label=License)

## Description

The Social Network API is a backend application built for a social media platform that allows users to share their thoughts, react to friends’ thoughts, and manage a friend list. This project leverages MongoDB for handling large volumes of unstructured data efficiently, Mongoose for object data modeling, and Express.js for routing and handling server-side logic. Designed for scalability and flexibility, this API provides the core functionality required to support a social networking site.

This application features a RESTful API for performing CRUD operations on Users, Thoughts, Reactions, and Friend relationships, making it easy to expand and integrate with a front-end or mobile application. With a focus on clean architecture and performance, the Social Network API is built to handle large datasets typical in social networking scenarios.

![Animated .gif of the Application Running in Insomnia]()

<!-- LINK WALKTHROUGH VIDEO -->

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
- [License](#license)

---

## Features

- **User Management**:
  - Create, update, and delete user profiles.
  - Each user has a unique username and email address.
- **Friendship Management**:
  - Add and remove friends from a user’s friend list.
  - Display a friend count using a virtual field.
- **Thought Management**:
  - Users can create, read, update, and delete their thoughts.
  - Thoughts can include embedded reactions, similar to comments or emojis.
- **Reaction System**:
  - Create and delete reactions embedded within thoughts.
  - Reactions are stored directly as subdocuments within the Thought document for easy management.
  - Display a reaction count using a virtual field.
- **Database Integration**:
  - MongoDB and Mongoose are used to manage complex data relationships.
  - Efficient querying and data retrieval, even with large datasets.

---

## Technologies Used

- **Node.js**: A JavaScript runtime used for building the server-side of the application.
- **Express.js**: A web framework for routing and middleware support.
- **MongoDB**: A NoSQL database for managing large amounts of unstructured data.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB, simplifying schema creation and data manipulation.
- **dotenv**: For managing environment variables securely.

---

## Installation

**To install this project locally, jump into your terminal application and please follow these steps**:

1. **Clone the `Social-Network-API` repository**:

   ```bash
   Using HTTPS:
   git clone https://github.com/TEMPTAG/Social-Network-API.git

   Using SSH:
   git clone git@github.com:TEMPTAG/Social-Network-API.git

   Using GitHub CLI:
   gh repo clone TEMPTAG/Social-Network-API
   ```

2. **Navigate into the `Social-Network-API` directory you just cloned down**:

   ```bash
   cd Social-Network-API
   ```

3. **Install the npm dependencies**:

   ```bash
   npm install
   ```

4. **Create an `.env` file in the root directory and add the following**:

   ```bash
   MONGODB_URI=mongodb://127.0.0.1:27017/socialNetworkDB
   PORT=3001
   ```

5. **Seed the Database**:

   ```bash
   npm run seed
   ```

6. **Start the appropriate server**:

   - Development server with live (nodemon) reloading:

   ```bash
   npm run dev
   ```

   - Production server:

   ```bash
   npm start
   ```

7. **Test the API using Insomnia with the following `API Endpoints`**

---

## API Endpoints

- **User Routes**:

  - `GET` /api/users - Get all users
  - `GET` /api/users/:userId - Get a single user by ID
  - `POST` /api/users - Create a new user
  - `PUT` /api/users/:userId - Update an existing user
  - `DELETE` /api/users/:userId - Delete a user and their associated thoughts
  - **Friends of User Routes**:
    - `POST` /api/users/:userId/friends/:friendId - Add a friend to a user’s friend list
    - `DELETE` /api/users/:userId/friends/:friendId - Remove a friend from a user’s friend list

- **Thought Routes**:
  - `GET` /api/thoughts - Get all thoughts
  - `GET` /api/thoughts/:thoughtId - Get a single thought by ID
  - `POST` /api/thoughts - Create a new thought (and associate it with a user)
  - `PUT` /api/thoughts/:thoughtId - Update an existing thought
  - `DELETE` /api/thoughts/:thoughtId - Delete a thought
  - **Reaction to Thoughts Routes**:
    - `POST` /api/thoughts/:thoughtId/reactions - Create a reaction to a thought
    - `DELETE` /api/thoughts/:thoughtId/reactions/:reactionId - Delete a reaction from a thought

---

## Usage

- Once the server is running, use Insomnia to test the API routes at the base URL:
  `http://localhost:3001`
- Use the above User, Thought, Reaction, and Friend Relationship `API Endpoints` to:
  - Create
  - Read
  - Update
  - Delete
- Example User Object JSON:

  ```json
  {
    "id": "example",
    "username": "ianRocks",
    "email": "ian@isawesome.com",
    "thoughts": [],
    "friends": [],
    "__v": 0,
    "friendCount": 0
  }
  ```

---

## Contributing

![GitHub contributors](https://img.shields.io/github/contributors/TEMPTAG/Social-Network-API?color=green) ![GitHub commit activity](https://img.shields.io/github/commit-activity/t/TEMPTAG/Social-Network-API)

OH. MY. GOODNESS. Collaborations are amazing. Share ideas, code, etc. with others is the best way to share knowledge, mutual enthusiasms, and a lot of times we make cool friends along the way. I welcome contributions in many ways, shapes, and forms:

- [Email Me](mailto:iansterlingferguson@gmail.com) and just plain tell me what you like, do not like, would like to see changed... just give me a compliment before laying it on me
- FORK IT ALL - create a fork, clone it down, mess it up, do the neato commits and comments, push it back, test it at least a million times, then submit a pull request for me to review and merge into the project if I think you are cool (and the code is cool too) - but again, the nice thing to do would be emailing me first and telling me your intentions... and don't forget the compliment part

Something, something... Have your people call my people. And by call, I mean email - who answers the phone these days?

---

## Tests

As the above states, please test your changes thoroughly before submitting a pull request or sending it straight to me. As far as tests I have done? None. Zero. Ziltch. I have not learned how to do that yet, so I am relying on you to do your part until I learn how to do mine.

---

## Questions

Have questions about this project? Want to collaborate? Eager to discuss conspiracy theories or debate why your favorite car is not as cool as you think? [Email Me](mailto:iansterlingferguson@gmail.com) — just do not call, because I probably will not answer.

Did this project make your life better in any way, shape, or form? Check out my other exceptionally rare moments of lucidity on my [GitHub Profile](https://github.com/TEMPTAG)

---

## License

This project is covered under the MIT License. The details of the MIT License can be found on their site [HERE](https://opensource.org/licenses/MIT). You can also see the full details of the [LICENSE](./LICENSE) for this specific project in the linked file.

<div align="center">
<em>Copyright © 2024 Ian Ferguson - powered by caffine, love, and a little bit of fun</em>

[Back to top](#top)

</div>
```
