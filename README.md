## 1. Start the application

- Docker needed to run the app: https://docs.docker.com/get-docker/ (docker compose will be automatically installed)
- Enter into the `backend` folder in the terminal.
- Type npm install (npm i) to install the required dependencies.
- Start the app: `npm run docker:up`
- Run it on `http://localhost:3000`.
- Stop the app: `npm run docker:down`

## 2. Some details

The app has been created with angular on the frontend and with node.js express on the backend.
Since it runs with docker compose, the FE has been built under the server as a static file, therefore they both run in the same container.
The app uses mongoDB database, which runs in a different container and ofcourse they communicate with each other.
