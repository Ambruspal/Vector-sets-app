const mongoose = require("mongoose");

const finalGroupsSchema = mongoose.Schema({}, { strict: false, timestamps: true });

module.exports = mongoose.model("FinalGroups", finalGroupsSchema);