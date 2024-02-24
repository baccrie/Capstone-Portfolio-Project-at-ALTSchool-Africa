"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, 'please provide a username'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'password cannot be empty'],
        trim: true,
    },
    api_key: {
        type: String,
        required: [true, 'api-key exists'],
        unique: true,
    },
    is_superUser: {
        type: Boolean,
        default: false,
    },
});
exports.default = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=user.js.map