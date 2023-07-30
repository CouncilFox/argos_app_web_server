# Argos App Web Server

This is a basic web server to handle API requests for the Argos App including a web and mobile app frontend.

## Features

- Authentication using JWT tokens.
- RESTful API to track user activity.

## Tech Stack

- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT

## Installation and Quick Start

This project requires a MongoDB database and Node.js to run.

### Environment Variables

Create a `.env` file in the root directory of the project. Update the file with your values.

```bash
NODE_ENV=development
PORT=5000
MONGO_URI=YOUR MONGO URI
JWT_SECRET=abc123
```

### Install Dependencies

To install the necessary dependencies, you need to run `npm install` in three places: the root directory, frontend directory, and backend directory. Navigate to each directory in the terminal and run the command:

```bash
npm install
```

### Start the Development Server

Once the dependencies are installed, you can start the development server. This project uses the `concurrently` library to run the frontend and backend servers simultaneously. Run the following command in the root directory:

```bash
npm run dev
```

Now, both the frontend and backend servers should be running. The backend server runs on http://localhost:5000 and the frontend server runs on http://localhost:3000 (or another port, if 3000 is occupied).

## License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.

---

Please replace "Project Name", the project description, and the list of features with details relevant to your specific project. You can also add sections like `Usage`, `Contributing`, or `Contact` as needed.
