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
exports.populateRegion = void 0;
const connect_1 = require("../db/connect");
const region_1 = __importDefault(require("../models/region"));
const region_json_1 = __importDefault(require("../seed/region.json"));
require('dotenv').config();
function populateRegion() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, connect_1.connectDB)(process.env.MONGODB_URI);
            yield region_1.default.deleteMany();
            const res = yield region_1.default.create(region_json_1.default);
            console.log(`Done...`);
            process.exit(0);
        }
        catch (err) {
            process.exit(1);
        }
    });
}
exports.populateRegion = populateRegion;
//populateRegion();
//# sourceMappingURL=populate-region.js.map