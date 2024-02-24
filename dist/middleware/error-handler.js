"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const custom_error_1 = __importDefault(require("../errors/custom-error"));
function errorHandler(error, req, res, next) {
    if (error instanceof custom_error_1.default) {
        return res.status(error.statusCode).json({
            status: 'failed',
            msg: error.message,
        });
    }
    console.log(error);
    res.status(500).json({
        status: 'failed',
        msg: 'Oops an error occured!!',
    });
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map