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
exports.signUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const generate_api_key_1 = __importDefault(require("../utils/generate-api-key"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const user_2 = __importDefault(require("../validation/user"));
function signUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = user_2.default.validate(req.body);
            if (error) {
                throw new bad_request_1.default(error.details[0].message, 401);
            }
            const { username, email, password } = req.body;
            // check if user exists
            const checkUser = yield user_1.default.findOne({
                email,
            });
            if (checkUser) {
                throw new bad_request_1.default('User with email already exists.', 401);
            }
            // hash password and gen api-key
            const apiKey = (0, generate_api_key_1.default)();
            const salt = yield bcryptjs_1.default.genSalt(12);
            const hashedPasskey = yield bcryptjs_1.default.hash(password, salt);
            // create new User
            const newUser = yield user_1.default.create({
                username,
                email,
                password: hashedPasskey,
                api_key: apiKey,
            });
            res.status(201).json({
                status: 'success',
                msg: `welcome on board dev ${username} below is your apiKey, please keep it safe.`,
                api_key: apiKey,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.signUp = signUp;
//# sourceMappingURL=auth.js.map