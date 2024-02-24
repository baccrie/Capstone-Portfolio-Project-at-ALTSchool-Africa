"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class customApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.default = customApiError;
// const createCustomError = (message, STAUS) => {
//   return new customApiError(message, STAUS);
// };
//# sourceMappingURL=custom-error.js.map