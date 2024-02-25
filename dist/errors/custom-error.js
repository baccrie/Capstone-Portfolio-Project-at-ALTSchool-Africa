"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class customApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.default = customApiError;
//# sourceMappingURL=custom-error.js.map