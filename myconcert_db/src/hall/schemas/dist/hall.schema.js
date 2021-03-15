"use strict";
exports.__esModule = true;
exports.HallSchema = void 0;
var mongoose = require("mongoose");
exports.HallSchema = new mongoose.Schema({
    name: String,
    nb_places: String,
    location: String,
    description: String,
    created_at: { type: Date, "default": Date.now }
});
