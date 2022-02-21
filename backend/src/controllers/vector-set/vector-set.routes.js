const express = require("express");
const controller = require("./vector-set.controller");

const router = express.Router();

router.post(
    "/",
    async(req, res, next) =>
    await controller.saveInitialAndFinalGroups(req, res, next)
);

router.get(
    "/",
    async(req, res, next) => await controller.getLastFinalGroups(req, res, next)
);

module.exports = Object.freeze(router);