"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
function connectDB(URI) {
    return mongoose_1.default.connect(URI);
}
exports.connectDB = connectDB;
module.exports = {
    connectDB,
};
//# sourceMappingURL=connect.js.map