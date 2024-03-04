"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const stateSchema = new mongoose_1.Schema({
    name: {
        type: String,
        // unique: [true, 'name already exists'],
        required: [true, 'name cannot be empty'],
        unique: true,
    },
    capital: {
        type: String,
        required: [true, 'capital cannot be empty'],
    },
    slogan: {
        type: String,
        required: [true, 'slogan cannot be empty'],
    },
    established: {
        type: String,
        required: [true, 'establshed cannot be empty'],
    },
    area: {
        type: String,
        required: [true, 'area cannot be empty'],
    },
    ethnic_groups: [
        {
            type: String,
        },
    ],
    population: {
        total: String,
        estimate: String,
        density: String,
    },
    region: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Region',
        required: [true, 'must be present'],
    },
    postal_code: {
        type: String,
        required: [true, 'postal_code cannot be empty'],
    },
    website: {
        type: String,
        required: [true, 'website cannot be empty'],
    },
    coordinate: {
        type: String,
        required: [true, 'coordinate cannot be empty'],
    },
    description: {
        type: String,
        required: [true, 'description cannot be empty'],
    },
    lgas: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Lga',
        },
    ],
    institutions: [
        {
            type: String,
            required: true,
        },
    ],
}, { timestamps: false });
exports.default = (0, mongoose_1.model)('State', stateSchema);
//# sourceMappingURL=state.js.map