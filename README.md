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

## Deployment

To deploy the application, we use PM2 and NGINX. We have created a script that automates the deployment process.

You need to ensure that PM2 and NGINX are installed on your server and then follow these steps:

### From Local Machine

If you want to deploy from your local machine, you can set up a git repository on your server and link it to your local machine via SSH. This allows you to push changes from your local machine to the server directly.

1. Setup a git repository on your server and link it to your local machine using SSH.
2. Ensure you have the correct remote set on your local machine to push changes.
3. Navigate to the root directory of your project in the local terminal.
4. Update the `start.config.cjs` file with your server's details.
5. Create a `.env` file in the root directory of the project with your environment variables (similar to the one described above for local development).
6. Push changes to your server:

   ```bash
   git push server master
   ```

7. Run the deployment script from your local machine:

   ```bash
   pm2 deploy start.config.cjs production setup
   ```

8. For subsequent deployments, use the update command from your local machine:

   ```bash
   pm2 deploy start.config.cjs production update
   ```

### From the Server

Alternatively, you can clone your project directly to the server and run the deployment script from there.

1. Clone your project to the server.
2. Navigate to the root directory of your project in the server terminal.
3. Update the `start.config.cjs` file with your server's details.
4. Create a `.env` file in the root directory of the project with your environment variables (similar to the one described above for local development).
5. Run the deployment script:

   ```bash
   pm2 deploy start.config.cjs production setup
   ```

6. For subsequent deployments, use the update command:

   ```bash
   pm2 deploy start.config.cjs production update
   ```

In both cases, remember to check your server's `sites-available/default` file to ensure the server block for your application is correctly configured for NGINX.

## License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.

---

Please replace "Project Name", the project description, and the list of features with details relevant to your specific project. You can also add sections like `Usage`, `Contributing`, or `Contact` as needed.
