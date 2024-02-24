"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const regionSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'name cannot be empty'],
    },
    states: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'State',
        },
    ],
    description: {
        type: String,
        required: true,
    },
    major_ethnic_group: [
        {
            type: String,
        },
    ],
}, { timestamps: false });
exports.default = (0, mongoose_1.model)('Region', regionSchema);
//# sourceMappingURL=region.js.map