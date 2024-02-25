"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const createStateSchema = joi_1.default.object({
    name: joi_1.default.string().trim().required(),
    capital: joi_1.default.string().trim().required(),
    slogan: joi_1.default.string().trim().required(),
    established: joi_1.default.string().trim().required(),
    area: joi_1.default.string().trim().required(),
    ethnic_groups: joi_1.default.array().required(),
    population: joi_1.default.object().required(),
    postal_code: joi_1.default.string().trim().required(),
    website: joi_1.default.string().trim().required().uri(),
    coordinate: joi_1.default.string().trim().required(),
    description: joi_1.default.string().trim().required(),
    lgas: joi_1.default.array().required(),
    institutions: joi_1.default.array().required(),
});
exports.default = createStateSchema;
//# sourceMappingURL=state.js.map