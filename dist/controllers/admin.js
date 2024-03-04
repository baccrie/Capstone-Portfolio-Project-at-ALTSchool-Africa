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
exports.deleteLga = exports.updateLga = exports.createLga = exports.deleteState = exports.updateState = exports.createState = exports.deleteRegion = exports.updateRegion = exports.createRegion = void 0;
const capitalize_first_letter_1 = require("../utils/capitalize-first-letter");
const region_1 = __importDefault(require("../models/region"));
const lga_1 = __importDefault(require("../models/lga"));
const state_1 = __importDefault(require("../models/state"));
let { StatusCodes } = require('http-status-codes');
const bad_request_1 = __importDefault(require("../errors/bad-request"));
// Region
// create region
function createRegion(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { name, description, major_ethnic_group } = req.body;
            name = (0, capitalize_first_letter_1.capitalize)(name);
            // check if region exists
            const check = yield region_1.default.findOne({ name });
            if (check) {
                throw new bad_request_1.default('Region with name already exists...', 400);
            }
            // else continue
            const newRegionObj = { name, description, major_ethnic_group };
            const newRegion = yield region_1.default.create(newRegionObj);
            res.status(StatusCodes.CREATED).json({
                status: 'success',
                data: newRegion,
            });
        }
        catch (err) {
            //console.log(err);
            next(err);
        }
    });
}
exports.createRegion = createRegion;
// update region
function updateRegion(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { name, description, major_ethnic_group } = req.body;
            let { region } = req.params;
            name = (0, capitalize_first_letter_1.capitalize)(name);
            region = (0, capitalize_first_letter_1.capitalize)(region);
            const newRegionObj = { name, description, major_ethnic_group };
            // check if region exists
            const check = yield region_1.default.findOne({
                name: region,
            });
            if (!check) {
                throw new bad_request_1.default('The region you re trying to update dosent exist!', 401);
            }
            // Update Region
            const updatedRegion = yield region_1.default.findOneAndUpdate({ name: region }, newRegionObj, {
                runValidators: true,
                new: true,
            });
            res.status(200).json({
                status: 'success',
                data: updatedRegion,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.updateRegion = updateRegion;
// delete region
function deleteRegion(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { region } = req.params;
            region = (0, capitalize_first_letter_1.capitalize)(region);
            const regionToDelete = yield region_1.default.find({
                name: region,
            });
            if (!regionToDelete || regionToDelete.length < 1) {
                throw new bad_request_1.default('The region you re trying to delete dosent exist!', 400);
            }
            //delete all lgas in region
            const reslt = yield lga_1.default.deleteMany({
                region: regionToDelete[0]._id,
            });
            // delete all states in region
            yield state_1.default.deleteMany({
                region: regionToDelete[0]._id,
            });
            // delete Region itself
            yield region_1.default.deleteOne({
                name: region,
            });
            res.status(200).json({
                status: 'success',
                msg: 'Region successfully deleted',
            });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.deleteRegion = deleteRegion;
// States
// create state
function createState(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { region } = req.params;
            region = (0, capitalize_first_letter_1.capitalize)(region);
            // const regg = await Region.find({ name: region });
            // console.log(regg);
            const regionToAddState = yield region_1.default.findOne({ name: region });
            if (!regionToAddState) {
                throw new bad_request_1.default('the region in which you re trying to add a state is invalid...', 400);
            }
            // check if state exists
            const check = yield state_1.default.findOne({
                name: (0, capitalize_first_letter_1.capitalize)(req.body.name),
            });
            if (check) {
                throw new bad_request_1.default('State with name already exists', 400);
            }
            const { name, capital, slogan, established, area, ethnic_groups, population, postal_code, website, coordinate, description, lgas, institutions, } = req.body;
            const queryObj = {
                name: (0, capitalize_first_letter_1.capitalize)(name),
                capital,
                slogan,
                established,
                region: regionToAddState._id,
                area,
                ethnic_groups,
                population,
                postal_code,
                website,
                coordinate,
                description,
                lgas: [],
                institutions,
            };
            // create state and add state to region
            const newState = yield state_1.default.create(queryObj);
            regionToAddState.states.push(newState._id);
            yield regionToAddState.save();
            res.status(200).json({
                status: 'success',
                data: newState,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.createState = createState;
function updateState(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //let { name, } = req.body;
            let { region, state } = req.params;
            state = (0, capitalize_first_letter_1.capitalize)(state);
            region = (0, capitalize_first_letter_1.capitalize)(region);
            req.body.name = (0, capitalize_first_letter_1.capitalize)(req.body.name);
            const queryObj = {
                name: req.body.name,
                capital: req.body.capital,
                slogan: req.body.slogan,
                established: req.body.established,
                area: req.body.area,
                ethnic_groups: req.body.ethnic_groups,
                postal_code: req.body.postal_code,
                website: req.body.website,
                coordinate: req.body.coordinate,
                population: req.body.population,
                description: req.body.description,
                institutions: req.body.institutions,
            };
            // check region validity
            const regionToUpdateState = yield region_1.default.findOne({
                name: region,
            });
            if (!regionToUpdateState) {
                throw new bad_request_1.default('The region from which you re trying to update a state dosent exists!!!', 400);
            }
            // check state vallidity
            const stateToUpdate = yield state_1.default.findOne({
                name: state,
                region: regionToUpdateState._id,
            });
            if (!stateToUpdate) {
                throw new bad_request_1.default('State dosent exist in region!!!', 400);
            }
            // check if states name is not been overwritten to avoid duplicate state name
            const check = yield state_1.default.findOne({ name: queryObj.name });
            if (check) {
                throw new bad_request_1.default('the name provided in the request body belongs to another state, pls choose another name', 400);
            }
            //Update Lga and save
            const data = yield state_1.default.findByIdAndUpdate(stateToUpdate._id, queryObj, {
                runValidators: true,
                new: true,
            });
            res.status(201).json({
                status: 'success',
                data: Object.assign({}, data._doc),
            });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.updateState = updateState;
function deleteState(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { region, state } = req.params;
            state = (0, capitalize_first_letter_1.capitalize)(state);
            region = (0, capitalize_first_letter_1.capitalize)(region);
            // check region validity
            const regionToDeleteState = yield region_1.default.findOne({
                name: region,
            });
            if (!regionToDeleteState) {
                throw new bad_request_1.default('The region from which you re trying to delete a state dosent exists!!!', 400);
            }
            // check state vallidity
            const stateToDelete = yield state_1.default.findOne({
                name: state,
                region: regionToDeleteState._id,
            });
            if (!stateToDelete) {
                throw new bad_request_1.default('State dosent exist in region!!!', 400);
            }
            // Delete state, delete state from region , delete all lgas with state
            const index = regionToDeleteState.states.findIndex((el) => el === stateToDelete._id);
            if (index > -1) {
                regionToDeleteState.states.splice(index, 1);
            }
            yield regionToDeleteState.save();
            yield lga_1.default.deleteMany({
                state: stateToDelete._id,
            });
            yield state_1.default.findOneAndDelete({
                _id: stateToDelete._id,
            });
            res.status(201).json({
                status: 'success',
                data: stateToDelete,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.deleteState = deleteState;
// Lgas
// create lga
function createLga(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { state } = req.params;
            let { name, region } = req.body;
            state = (0, capitalize_first_letter_1.capitalize)(state);
            region = (0, capitalize_first_letter_1.capitalize)(region);
            const stateToAddLga = yield state_1.default.findOne({
                name: state,
            });
            if (!stateToAddLga) {
                throw new bad_request_1.default('the state you re trying to create a lga for dosent exists..', 400);
            }
            const regionToAddLga = yield region_1.default.findOne({
                name: region,
            });
            if (!regionToAddLga) {
                throw new bad_request_1.default('Oops region is invalid!!', 400);
            }
            //console.log(regionToAddLga.states.includes(stateToAddLga._id));
            // check if state is under region
            if (!regionToAddLga.states.includes(stateToAddLga._id)) {
                throw new bad_request_1.default('Oops, the state you re trying to create an lga for dosent exist under the specified region', 400);
            }
            // check if lga exists under state
            const check = yield lga_1.default.findOne({
                name: (0, capitalize_first_letter_1.trim)(name),
            });
            if (check) {
                if (stateToAddLga.lgas.includes(check._id)) {
                    throw new bad_request_1.default('Lga already exists in state and region!!!', 400);
                }
            }
            const lga = yield lga_1.default.create({
                name: (0, capitalize_first_letter_1.trim)(name),
                state: stateToAddLga._id,
                region: regionToAddLga._id,
            });
            // Add Lga to State
            stateToAddLga.lgas.push(lga._id);
            yield stateToAddLga.save();
            res.status(StatusCodes.CREATED).json({
                status: 'success',
                data: lga,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.createLga = createLga;
// update lga
function updateLga(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { name } = req.body;
            let { state, lga } = req.params;
            state = (0, capitalize_first_letter_1.capitalize)(state);
            name = (0, capitalize_first_letter_1.trim)(name);
            lga = (0, capitalize_first_letter_1.trim)(lga);
            // check state validity
            const stateToAddLga = yield state_1.default.findOne({
                name: state,
            });
            if (!stateToAddLga) {
                throw new bad_request_1.default('The state from which you re trying to update a lga dosent exists!!!', 400);
            }
            // check lga vallidity
            const lgaToUpdate = yield lga_1.default.findOne({
                name: lga,
                state: stateToAddLga._id,
            });
            if (!lgaToUpdate) {
                throw new bad_request_1.default('Lga dosent exist in state!!!', 400);
            }
            //Update Lga and save
            lgaToUpdate.name = name;
            lgaToUpdate.save();
            res.status(201).json({
                status: 'success',
                data: {
                    lgaToUpdate,
                },
            });
        }
        catch (err) {
            //console.log(err);
            next(err);
        }
    });
}
exports.updateLga = updateLga;
// delete lga
function deleteLga(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { state, lga } = req.params;
            state = (0, capitalize_first_letter_1.capitalize)(state);
            lga = (0, capitalize_first_letter_1.trim)(lga);
            // check state validity
            const stateToDeleteLga = yield state_1.default.findOne({
                name: state,
            });
            if (!stateToDeleteLga) {
                throw new bad_request_1.default('The state from which you re trying to delete a lga dosent exists!!!', 400);
            }
            // check lga vallidity
            const lgaToDelete = yield lga_1.default.findOne({
                name: lga,
                state: stateToDeleteLga._id,
            });
            //console.log(lgaToDelete);
            if (!lgaToDelete) {
                throw new bad_request_1.default('Lga dosent exist in state!!!', 400);
            }
            // Delete lga and also delete from state
            const index = stateToDeleteLga.lgas.findIndex((el) => el === lgaToDelete._id);
            if (index > -1) {
                stateToDeleteLga.lgas.splice(index, 1);
            }
            yield stateToDeleteLga.save();
            yield lga_1.default.findOneAndDelete({
                _id: lgaToDelete._id,
            });
            res.status(201).json({
                status: 'success',
                data: lgaToDelete,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.deleteLga = deleteLga;
//# sourceMappingURL=admin.js.map