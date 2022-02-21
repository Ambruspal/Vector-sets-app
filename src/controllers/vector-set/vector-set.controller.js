const service = require("./vector-set.service");
const validateInput = require("../../utils/validation");
const httpError = require("http-errors");

exports.saveInitialAndFinalGroups = async(req, res, next) => {
    // Validation
    const { group, threshold } = req.body;
    let isValid;

    if (
        typeof group === "object" &&
        !Array.isArray(group) &&
        typeof threshold === "number" &&
        /^\d+((?=\.)\.\d+)?$/.test(String(threshold))
    ) {
        isValid = validateInput(group);
    } else return next(new httpError.BadRequest("Invalid input data!"));

    if (!isValid) return next(new httpError.BadRequest("Invalid input data!"));

    // Save valid initial data
    const savedInitialGroups = await service.saveInitialGroups(group);
    if (!savedInitialGroups)
        return next(
            new httpError.InternalServerError(
                "Initial save to database has been failed!"
            )
        );

    // Save copy of initial data
    const finalGroups = await service.saveFinalGroups(group);
    if (!finalGroups)
        return next(
            new httpError.InternalServerError(
                "Final save to database has been failed!"
            )
        );

    res.status(201).json(finalGroups);
};

exports.getLastFinalGroups = async(req, res, next) => {
    const lastFinalGroups = await service.getLastFinalGroups();
    if (lastFinalGroups.length === 0) return next(new httpError.NotFound());
    res.status(200).json(lastFinalGroups[0]);
};