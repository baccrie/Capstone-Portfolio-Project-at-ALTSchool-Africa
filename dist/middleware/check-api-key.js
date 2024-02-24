"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unauthenticated_1 = __importDefault(require("../errors/unauthenticated"));
const user_1 = __importDefault(require("../models/user"));
function checkApiKey(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apiKey = req.headers.apikey;
            if (!apiKey) {
                throw new unauthenticated_1.default('api key is missing in request header', 401);
            }
            // validate key
            const check = yield user_1.default.findOne({
                api_key: apiKey,
            });
            if (!check) {
                throw new unauthenticated_1.default('Invalid Api Key', 401);
            }
            next();
        }
        catch (err) {
            next(err);
        }
    });
}
exports.default = checkApiKey;
//# sourceMappingURL=check-api-key.js.map