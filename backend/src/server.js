const express = require("express");
const app = express();
const path = require("path");
const staticFrontendUrl = path.join(__dirname, "..", "public");

// For development mode:
// const cors = require("cors");
// app.use(cors());

app.use(express.json());

app.use("/api", require("./controllers/vector-set/vector-set.routes"));

app.use((err, req, res, next) => {
    console.log("Error!");
    res.status(err.statusCode).json({
        message: err.message,
    });
});

app.get("*/*", express.static(staticFrontendUrl));
app.all("*", (req, res) => {
    res.status(200).sendFile(`${staticFrontendUrl}/index.html`);
});

module.exports = Object.freeze(app);