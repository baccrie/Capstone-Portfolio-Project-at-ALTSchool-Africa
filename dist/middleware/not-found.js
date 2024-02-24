"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
function notFound(req, res, next) {
    res.status(404).json({
        status: 'failed',
        msg: 'route not found....',
    });
}
exports.notFound = notFound;
//# sourceMappingURL=not-found.js.map