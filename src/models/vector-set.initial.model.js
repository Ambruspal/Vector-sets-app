const mongoose = require("mongoose");

const initialGroupsSchema = mongoose.Schema({}, { strict: false, timestamps: true });

module.exports = mongoose.model("InitialGroups", initialGroupsSchema);