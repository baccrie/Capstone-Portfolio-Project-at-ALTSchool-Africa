"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("../controllers/admin");
const router = express_1.default.Router();
// Region
router.post('/region', admin_1.createRegion);
router.patch('/update/region/:region', admin_1.updateRegion);
router.delete('/delete/region/:region/', admin_1.deleteRegion);
// State
router.post('/:region/state', admin_1.createState);
router.patch('/update/state/:region/:state', admin_1.updateState);
router.delete('/delete/state/:region/:state', admin_1.deleteState);
//Lga
router.post('/:state/lga', admin_1.createLga);
router.patch('/update/lga/:state/:lga', admin_1.updateLga);
router.delete('/delete/lga/:state/:lga', admin_1.deleteLga);
exports.default = router;
//# sourceMappingURL=admin.js.map