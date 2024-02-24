"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// node modules
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const connect_1 = require("./db/connect");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// third party modules
const locale_1 = __importDefault(require("./routes/locale"));
const auth_1 = __importDefault(require("./routes/auth"));
const admin_1 = __importDefault(require("./routes/admin"));
const error_handler_1 = require("./middleware/error-handler");
const not_found_1 = require("./middleware/not-found");
const populate_region_1 = require("./populate/populate-region");
const populate_state_1 = require("./populate/populate-state");
let openApiDocumentation = require('./docs.json');
const check_api_key_1 = __importDefault(require("./middleware/check-api-key"));
// initializing express server
const app = (0, express_1.default)();
const PORT = process.env.PORT;
// rate limiter
const limiter = (0, express_rate_limit_1.default)({
    // max of 30 request per minute
    max: 30,
    windowMs: 60 * 1000,
    message: 'Too many requests',
});
// middlewares
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openApiDocumentation));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(limiter);
// endpoints
app.use('/api/v1/nigeria', auth_1.default);
app.use('/api/v1/nigeria', locale_1.default);
app.use('/api/v1/nigeria', check_api_key_1.default, admin_1.default);
// test api
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'api working...',
    });
});
// error and not found
app.use(error_handler_1.errorHandler);
app.use(not_found_1.notFound);
// connect to db and start server
(0, connect_1.connectDB)(process.env.MONGODB_URI)
    .then((res) => {
    console.log(`Connection to db successful...`);
})
    .then(() => {
    if (process.env.NODE_ENV === 'production') {
        (0, populate_region_1.populateRegion)();
        (0, populate_state_1.populateStateAndLga)();
        console.log('Database successfully loaded and populated..');
    }
})
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening to port ${PORT}....`);
    });
});
//# sourceMappingURL=app.js.map