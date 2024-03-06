"use strict";
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable indent */
// import mongoose from 'mongoose';
// import { MongoMemoryServer } from 'mongodb-memory-server';
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
// const mongoDB = new MongoMemoryServer();
// /**
//  * Drop database, close the connection and stop mongod.
//  */
// export default async () => {
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
//   await mongoDB.stop();
// };
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../models/user"));
const region_1 = __importDefault(require("../models/region"));
const state_1 = __importDefault(require("../models/state"));
const lga_1 = __importDefault(require("../models/lga"));
/*
    Drop Dabatabase and close connection
*/
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.deleteOne({
        _id: '65db4c5428e883e3affcc6c8',
        username: 'baccrie',
        email: 'test@test.com',
        password: '3injwed9$ghwjU&buhwbOInq67u92h8',
        api_key: '82hikjenf719&#Y*@!IKN877y',
    });
    yield region_1.default.deleteOne({
        name: 'Tested-Region',
    });
    yield state_1.default.deleteOne({
        name: 'Driftmark',
    });
    yield lga_1.default.deleteOne({
        name: 'Storms-End',
    });
    yield mongoose_1.default.connection.close();
});
//# sourceMappingURL=jest.teardown.js.map