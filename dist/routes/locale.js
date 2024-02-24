"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const locale_1 = require("../controllers/locale");
const cache_1 = require("../middleware/cache");
// search endpoints
router.get('/search', locale_1.search);
// general endpoints
router.get('/regions', cache_1.getAllR, locale_1.getAllRegions);
router.get('/states', cache_1.getAllS, locale_1.getAllStates);
router.get('/lgas', cache_1.getAllL, locale_1.getAllLgas);
//specific endpoints
router.get('/:region/lgas', locale_1.lgasInRegion);
router.get('/:region/:state/lgas', locale_1.lgasInState);
router.get('/:region/states', locale_1.statesInRegion);
// admin endpoints
exports.default = router;
//# sourceMappingURL=locale.js.map