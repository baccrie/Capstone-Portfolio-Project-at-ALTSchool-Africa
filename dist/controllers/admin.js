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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLga = exports.updateLga = exports.createLga = exports.deleteState = exports.updateState = exports.createState = exports.deleteRegion = exports.updateRegion = exports.createRegion = void 0;
let { capitalize } = require('../utils/capitalize-first-letter');
let Region = require('../models/region');
let State = require('../models/state');
let Lga = require('../models/lga');
let { StatusCodes } = require('http-status-codes');
let BadRequestError = require('../errors/bad-request');
// Region
// create region
function createRegion(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { name, description, major_ethnic_group } = req.body;
            name = capitalize(name);
            // check if region exists
            const check = yield Region.findOne({ name });
            if (check) {
                throw new BadRequestError('Region with name already exists...');
            }
            // else continue
            const newRegionObj = { name, description, major_ethnic_group };
            const newRegion = yield Region.create(newRegionObj);
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
            name = capitalize(name);
            region = capitalize(region);
            console.log(req.params);
            const newRegionObj = { name, description, major_ethnic_group };
            // check if region exists
            const check = yield Region.findOne({
                name: region,
            });
            if (!check) {
                throw new BadRequestError('The region you re trying to update dosent exist!');
            }
            // Update Region
            const updatedRegion = yield Region.findOneAndUpdate({ name: region }, newRegionObj, {
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
            region = capitalize(region);
            const regionToDelete = yield Region.find({
                name: region,
            });
            if (!regionToDelete || regionToDelete.length < 1) {
                throw new BadRequestError('The region you re trying to delete dosent exist!');
            }
            //delete all lgas in region
            const reslt = yield Lga.deleteMany({
                region: regionToDelete[0]._id,
            });
            // delete all states in region
            yield State.deleteMany({
                region: regionToDelete[0]._id,
            });
            // delete Region itself
            yield Region.deleteOne({
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
            region = capitalize(region);
            const regionToAddState = yield Region.findOne({ name: region });
            if (!regionToAddState) {
                throw new BadRequestError('the region in which you re trying to add a state is invalid...');
            }
            // check if state exists
            const check = yield State.findOne({
                name: capitalize(req.body.name),
            });
            if (check) {
                throw new BadRequestError('State with name already exists');
            }
            const { name, capital, slogan, established, area, ethnic_groups, population, postal_code, website, coordinate, description, lgas, institutions, } = req.body;
            const queryObj = {
                name: capitalize(name),
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
            const newState = yield State.create(queryObj);
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
            state = capitalize(state);
            region = capitalize(region);
            req.body.name = capitalize(req.body.name);
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
            const regionToUpdateState = yield Region.findOne({
                name: region,
            });
            if (!regionToUpdateState) {
                throw new BadRequestError('The region from which you re trying to update a state dosent exists!!!');
            }
            // check state vallidity
            const stateToUpdate = yield State.findOne({
                name: state,
                region: regionToUpdateState._id,
            });
            if (!stateToUpdate) {
                throw new BadRequestError('State dosent exist in region!!!');
            }
            // check if states name is not been overwritten to avoid duplicate state name
            const check = yield State.findOne({ name: queryObj.name });
            if (check) {
                throw new BadRequestError('the name provided in the request body belongs to another state, pls choose another name');
            }
            //Update Lga and save
            const data = yield State.findByIdAndUpdate(stateToUpdate._id, queryObj, {
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
            state = capitalize(state);
            region = capitalize(region);
            // check region validity
            const regionToDeleteState = yield Region.findOne({
                name: region,
            });
            if (!regionToDeleteState) {
                throw new BadRequestError('The region from which you re trying to delete a state dosent exists!!!');
            }
            // check state vallidity
            const stateToDelete = yield State.findOne({
                name: state,
                region: regionToDeleteState._id,
            });
            if (!stateToDelete) {
                throw new BadRequestError('State dosent exist in region!!!');
            }
            // Delete state, delete state from region , delete all lgas with state
            const index = regionToDeleteState.states.findIndex((el) => el === stateToDelete._id);
            if (index > -1) {
                regionToDeleteState.states.splice(index, 1);
            }
            yield regionToDeleteState.save();
            yield Lga.deleteMany({
                state: stateToDelete._id,
            });
            yield State.findOneAndDelete({
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
            state = capitalize(state);
            region = capitalize(region);
            const stateToAddLga = yield State.findOne({
                name: state,
            });
            if (!stateToAddLga) {
                throw new BadRequestError('the state you re trying to create a lga for dosent exists..');
            }
            const regionToAddLga = yield Region.findOne({
                name: region,
            });
            if (!regionToAddLga) {
                throw new BadRequestError('Oops region is invalid!!');
            }
            // check if lga exists under state and region
            const check = yield Lga.findOne({
                region: regionToAddLga._id,
                state: stateToAddLga._id,
            });
            if (check) {
                throw new BadRequestError('Lga already exists in state and region!!!');
            }
            const lga = yield Lga.create({
                name,
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
            state = capitalize(state);
            // check state validity
            const stateToAddLga = yield State.findOne({
                name: state,
            });
            if (!stateToAddLga) {
                throw new BadRequestError('The state from which you re trying to update a lga dosent exists!!!');
            }
            // check lga vallidity
            const lgaToUpdate = yield Lga.findOne({
                name: lga,
                state: stateToAddLga._id,
            });
            if (!lgaToUpdate) {
                throw new BadRequestError('Lga dosent exist in state!!!');
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
            state = capitalize(state);
            // check state validity
            const stateToDeleteLga = yield State.findOne({
                name: state,
            });
            if (!stateToDeleteLga) {
                throw new BadRequestError('The state from which you re trying to delete a lga dosent exists!!!');
            }
            console.log(lga);
            // check lga vallidity
            const lgaToDelete = yield Lga.findOne({
                name: lga,
                state: stateToDeleteLga._id,
            });
            //console.log(lgaToDelete);
            if (!lgaToDelete) {
                throw new BadRequestError('Lga dosent exist in state!!!');
            }
            // Delete lga and also delete from state
            const index = stateToDeleteLga.lgas.findIndex((el) => el === lgaToDelete._id);
            if (index > -1) {
                stateToDeleteLga.lgas.splice(index, 1);
            }
            yield stateToDeleteLga.save();
            yield Lga.findOneAndDelete({
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