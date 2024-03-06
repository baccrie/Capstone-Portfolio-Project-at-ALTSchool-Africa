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
exports.statesInRegion = exports.lgasInState = exports.lgasInRegion = exports.search = exports.getAllLgas = exports.getAllStates = exports.getAllRegions = void 0;
const region_1 = __importDefault(require("../models/region"));
const lga_1 = __importDefault(require("../models/lga"));
const state_1 = __importDefault(require("../models/state"));
const capitalize_first_letter_1 = require("../utils/capitalize-first-letter");
// errors
const bad_request_1 = __importDefault(require("../errors/bad-request"));
// general endpoints controllers
function getAllRegions(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield region_1.default.find()
                .select('-__v')
                .populate('states', '-_id name capital slogan');
            res.status(200).json({
                status: 'success',
                nos: data.length,
                data,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getAllRegions = getAllRegions;
function getAllStates(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // let { limit, page } = req.query;
        let limit = parseInt(req.query.limit);
        let page = parseInt(req.query.page);
        try {
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
            const data = yield states;
            if (!data || data.length < 1) {
                throw new bad_request_1.default('Invalid query.');
            }
            res.status(200).json({
                status: 'success',
                nos: data.length,
                noOfPages,
                data,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getAllStates = getAllStates;
function getAllLgas(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let limit = parseInt(req.query.limit);
        let page = parseInt(req.query.page);
        try {
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
            const data = yield lgas;
            // check for empty result set
            if (!data || data.length < 1) {
                throw new bad_request_1.default('Invalid query provided...');
            }
            res.status(200).json({
                status: 'success',
                nos: data.length,
                noOfPages,
                data: data,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getAllLgas = getAllLgas;
// search endpoint
function search(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let keyword = req.query.keyword;
            let data;
            keyword = (0, capitalize_first_letter_1.capitalize)(keyword);
            // check region
            data = yield region_1.default.findOne({ name: keyword }).populate('states', '-lgas');
            if (!data) {
                data = yield state_1.default.findOne({ name: keyword })
                    .populate('lgas', 'name region')
                    .populate('region', 'name')
                    .select('-__v');
            }
            if (!data) {
                let key = req.query.keyword;
                key = (0, capitalize_first_letter_1.trim)(key);
                data = yield lga_1.default.findOne({ name: key })
                    .select('-__v')
                    .populate('state', '-_id name capital')
                    .populate('region', '-_id name');
            }
            if (!data || data === null) {
                throw new bad_request_1.default('Invalid search key, search by state, lga or region name pls..');
            }
            const resType = data instanceof state_1.default
                ? 'State'
                : data instanceof region_1.default
                    ? 'Region'
                    : 'Lga';
            res.status(200).json({
                status: 'success',
                msg: `Found result in ${resType}`,
                data,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.search = search;
// specific endpoints controllers
function lgasInRegion(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // validate with joi
        let limit = parseInt(req.query.limit);
        let page = parseInt(req.query.page);
        let { region } = req.params;
        try {
            region = (0, capitalize_first_letter_1.capitalize)(region);
            const getRegion = yield region_1.default.findOne({
                name: region,
            });
            // check region validity
            if (!getRegion) {
                throw new bad_request_1.default('The region is invalid....');
            }
            // get lgas in Region
            const totalNo = yield lga_1.default.find({
                region: getRegion._id,
            }).countDocuments({});
            let lga = lga_1.default.find({
                region: getRegion._id,
            })
                .select('name state')
                .populate('state', 'name capital');
            // ckeck if client is willing to paginate
            if (limit || page) {
                limit = Number(limit) || 20;
                page = Number(page) || 1;
                const skip = (page - 1) * limit;
                lga = lga.skip(skip).limit(limit);
            }
            const noOfPages = Math.ceil(totalNo / limit) || 1;
            const data = yield lga;
            if (!data || data.length < 1) {
                throw new bad_request_1.default('Invalid query.');
            }
            res.status(200).json({
                status: 'success',
                nos: data.length,
                noOfPages,
                data,
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    });
}
exports.lgasInRegion = lgasInRegion;
function lgasInState(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let { state, region } = req.params;
        let limit = parseInt(req.query.limit);
        let page = parseInt(req.query.page);
        try {
            state = (0, capitalize_first_letter_1.capitalize)(state);
            region = (0, capitalize_first_letter_1.capitalize)(region);
            const getRegion = yield region_1.default.findOne({
                name: region,
            });
            const getState = yield state_1.default.findOne({
                name: state,
            }).populate('region', 'name');
            const getRegionName = yield region_1.default.findOne({ _id: getState.region });
            // check region existence
            if (!getRegion) {
                throw new bad_request_1.default('The region is invalid...');
            }
            // check state existence
            if (!getState) {
                throw new bad_request_1.default('The state is invalid...');
            }
            // check existence of state in region
            if (!(getRegionName.name === getRegion.name)) {
                throw new bad_request_1.default('The state dosent exist for the particular region...');
            }
            const totalNo = yield lga_1.default.find({
                state: getState._id,
                region: getRegion._id,
            }).countDocuments({});
            let lga = lga_1.default.find({
                state: getState._id,
                region: getRegion._id,
            }).select('name');
            // check if client is willing to paginate
            if (limit || page) {
                limit = Number(limit) || 5;
                page = Number(page) || 1;
                const skip = (page - 1) * limit;
                lga = lga.skip(skip).limit(limit);
            }
            const data = yield lga;
            const noOfPages = Math.ceil(totalNo / limit) || 1;
            if (!data || data.length < 1) {
                throw new bad_request_1.default('Invalid query.');
            }
            res.status(200).json({
                status: 'success',
                nos: data.length,
                noOfPages,
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.lgasInState = lgasInState;
function statesInRegion(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let { region } = req.params;
        try {
            region = (0, capitalize_first_letter_1.capitalize)(region);
            const getRegion = yield region_1.default.findOne({
                name: region,
            });
            if (!getRegion) {
                throw new bad_request_1.default('The region is invalid....');
            }
            const data = yield state_1.default.find({
                region: getRegion._id,
            }).select('-lgas -__v');
            if (!data || data.length < 1) {
                throw new bad_request_1.default('Invalid query.');
            }
            res.status(200).json({
                status: 'success',
                nos: data.length,
                data,
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    });
}
exports.statesInRegion = statesInRegion;
//# sourceMappingURL=locale.js.map