"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const lgaSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    state: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'State',
        required: true,
    },
    region: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Region',
        required: true,
    },
}, { timestamps: false });
exports.default = (0, mongoose_1.model)('Lga', lgaSchema);
//# sourceMappingURL=lga.js.map