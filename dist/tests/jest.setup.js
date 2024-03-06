"use strict";
// const mongoDB = new MongoMemoryServer();
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
exports.connectToDatabase = void 0;
const connect_1 = require("../db/connect");
const user_1 = __importDefault(require("../models/user"));
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    // conect to the database
    yield (0, connect_1.connectDB)(process.env.MONGODB_URI);
    // await create a test user with api key
    yield user_1.default.create({
        _id: '65db4c5428e883e3affcc6c8',
        username: 'baccrie',
        email: 'test@test.com',
        password: '3injwed9$ghwjU&buhwbOInq67u92h8',
        api_key: '82hikjenf719&#Y*@!IKN877y',
    });
});
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=jest.setup.js.map