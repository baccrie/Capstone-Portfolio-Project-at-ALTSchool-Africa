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
exports.getAllL = exports.getAllS = exports.getAllR = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const region_1 = __importDefault(require("../models/region"));
const lga_1 = __importDefault(require("../models/lga"));
const state_1 = __importDefault(require("../models/state"));
// errors
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const redisClient = new ioredis_1.default();
// locale endpoints
// general endpoints
function getAllR(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cachedResults = yield redisClient.get('getAllRegions');
            if (cachedResults) {
                const data = JSON.parse(cachedResults);
                res.status(200).json({
                    status: 'success',
                    nos: data.length,
                    data,
                });
            }
            else {
                const data = yield region_1.default.find()
                    .select('-__v')
                    .populate('states', '-_id name capital slogan');
                yield redisClient.set('getAllRegions', JSON.stringify(data), 'EX', 100);
                next();
            }
        }
        catch (err) {
            next(err);
        }
    });
}
exports.getAllR = getAllR;
function getAllS(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cachedResults = yield redisClient.get('getAllStates');
            if (cachedResults) {
                const { data, noOfPages } = JSON.parse(cachedResults);
                res.status(200).json({
                    status: 'success',
                    nos: data.length,
                    noOfPages,
                    data,
                });
            }
            else {
                // let { limit, page } = req.query;
                let limit = parseInt(req.query.limit);
                let page = parseInt(req.query.page);
                const totalNo = yield state_1.default.find().countDocuments({});
                let states = state_1.default.find()
                    .select('-lgas -__v')
                    .populate('region', '-_id name');
                // check if client is willing to paginate
                if (limit || page) {
                    limit = Number(limit) || 6;
                    page = Number(page) || 1;
                    const skip = (page - 1) * limit;
                    states = states.skip(skip).limit(limit);
                }
                const noOfPages = Math.ceil(totalNo / limit) || 1;
                let data = {};
                data.data = yield states;
                data.noOfPages = noOfPages;
                yield redisClient.set('getAllStates', JSON.stringify(data), 'EX', 100);
                if (!data || data.length < 1) {
                    throw new bad_request_1.default('Invalid query.', 400);
                }
                next();
            }
        }
        catch (err) {
            next(err);
        }
    });
}
exports.getAllS = getAllS;
function getAllL(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // let { limit, page } = req.query;
            let limit = parseInt(req.query.limit);
            let page = parseInt(req.query.page);
            const cachedResults = yield redisClient.get('getAllLgas');
            if (cachedResults) {
                const { data, noOfPages } = JSON.parse(cachedResults);
                res.status(200).json({
                    status: 'success',
                    nos: data.length,
                    noOfPages,
                    data: data,
                });
            }
            else {
                const totalNo = yield lga_1.default.find().countDocuments({});
                let lgas = lga_1.default.find()
                    .populate('region', '-_id name')
                    .populate('state', '-_id name');
                // check if clients is willing to paginate
                if (limit || page) {
                    limit = Number(limit) || 50;
                    page = Number(page) || 1;
                    const skip = (page - 1) * limit;
                    lgas = lgas.skip(skip).limit(limit);
                }
                const noOfPages = Math.ceil(totalNo / limit) || 1;
                let data = {};
                data.data = yield lgas;
                data.noOfPages = noOfPages;
                yield redisClient.set('getAllLgas', JSON.stringify(data), 'EX', 100);
                next();
                if (!data || data.length < 1) {
                    throw new bad_request_1.default('Invalid query.', 400);
                }
            }
        }
        catch (err) {
            next(err);
        }
    });
}
exports.getAllL = getAllL;
//# sourceMappingURL=cache.js.map