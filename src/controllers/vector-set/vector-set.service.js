const InitialGroups = require("../../models/vector-set.initial.model");
const FinalGroups = require("../../models/vector-set.final.model");

exports.saveInitialGroups = (newInitialData) => {
    const newInitialGroups = new InitialGroups(newInitialData);
    return newInitialGroups.save();
};

exports.saveFinalGroups = (newFinalData) => {
    const newFinalGroups = new FinalGroups(newFinalData);
    return newFinalGroups.save();
};

exports.getLastFinalGroups = () => {
    const finalGroups = FinalGroups.find()
        .sort({ createdAt: -1 })
        .limit(1)
        .select("-createdAt -updatedAt -_id -__v");
    return finalGroups;
};