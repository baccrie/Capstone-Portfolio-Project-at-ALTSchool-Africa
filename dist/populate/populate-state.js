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
exports.populateStateAndLga = void 0;
const connect_1 = require("../db/connect");
const region_1 = __importDefault(require("../models/region"));
const state_1 = __importDefault(require("../models/state"));
const lga_1 = __importDefault(require("../models/lga"));
const states_json_1 = __importDefault(require("../seed/states.json"));
require('dotenv').config();
function populateStateAndLga() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log();
            yield (0, connect_1.connectDB)(process.env.MONGODB_URI);
            yield state_1.default.deleteMany();
            yield lga_1.default.deleteMany();
            for (const state of states_json_1.default) {
                const newState = new state_1.default();
                let stateRegion = yield region_1.default.find({
                    name: { $regex: state.region, $options: 'i' },
                });
                // console.log(stateRegion[0]._id);
                // console.log(state);
                newState.name = state.name;
                newState.capital = state.capital;
                newState.slogan = state.slogan;
                newState.established = state.established;
                newState.area = state.area;
                newState.postal_code = state.postal_code;
                newState.website = state.website;
                newState.coordinate = state.coordinate;
                newState.region = stateRegion[0]._id;
                newState.population = state.population;
                newState.description = state.description;
                newState.ethnic_groups = state.ethnic_groups;
                newState.lgas;
                newState.institutions = state.institutions;
                for (const lga of state.lgas) {
                    const newLga = new lga_1.default();
                    newLga.name = lga;
                    newLga.state = newState._id;
                    newLga.region = stateRegion[0]._id;
                    newState.lgas.push(newLga._id);
                    yield newLga.save();
                }
                stateRegion[0].states.push(newState._id);
                stateRegion[0].save();
                newState.save();
                console.log(newState.name, 'is done....');
            }
            console.log('Done');
        }
        catch (error) {
            process.exit(1);
        }
    });
}
exports.populateStateAndLga = populateStateAndLga;
//populateData().then((res) => {});
//# sourceMappingURL=populate-state.js.map