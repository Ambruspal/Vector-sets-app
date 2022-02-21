## 1. Start the application

- Docker needed to run the app: https://docs.docker.com/get-docker/ (docker compose will be automatically installed)
- Enter into the `backend` folder in the terminal.
- Type npm install (npm i) to install the required dependencies.
- Start the app: `npm run docker:up`
- Run it on `http://localhost:3000`.
- Stop the app: `npm run docker:down`

## 2. The functioning of the application

The app has been created with angular on the frontend and with node.js express on the backend.
Since it runs via docker compose, the frontend has been built under the backend as a static file.
Therefore the server (with the static frontend) runs in a docker container, connecting to a local mongoDB database which runs in another docker container.
