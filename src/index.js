require("dotenv").config();
const app = require("./server");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const config = require("config");

// For development mode:
// const database = "devDatabase";
const database = "database";
if (!config.has(database)) {
    console.error("Database configuration is not found!");
    process.exit();
}
const { dbType, dbUser, dbPassword, dbHost } = config.get(database);

mongoose
    .connect(`${dbType}${dbUser}${dbPassword}${dbHost}`)
    .then(() => console.log("MongoDB connection is successful"))
    .catch((error) => {
        console.log(`MongoDB connection problem: ${error}`);
        process.exit();
    });

app.listen(port, () => console.log(`Server is running on port ${port}`));