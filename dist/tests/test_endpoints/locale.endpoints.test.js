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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const jest_teardown_1 = __importDefault(require("../jest.teardown"));
const jest_setup_1 = require("../jest.setup");
require('dotenv').config({ path: '../../../.env' });
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, jest_setup_1.connectToDatabase)();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, jest_teardown_1.default)();
}));
describe('General endpoints', () => {
    it('should get all regions', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/api/v1/nigeria/regions')
            .set('apikey', '82hikjenf719&#Y*@!IKN877y');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.nos).toBeGreaterThan(0);
        expect(response.body.nos).toBeLessThan(7);
        expect(response.body.data.length).toBe(response.body.nos);
    }));
    it('should get all states', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/api/v1/nigeria/states')
            .set('apikey', '82hikjenf719&#Y*@!IKN877y');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.nos).toBeGreaterThan(0);
        expect(response.body.noOfPages).toBeGreaterThan(0);
    }));
    it('should get all lgas', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/api/v1/nigeria/lgas')
            .set('apikey', '82hikjenf719&#Y*@!IKN877y');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.nos).toBeGreaterThan(0);
        expect(response.body.noOfPages).toBeGreaterThan(0);
    }));
});
describe('Specific endpoints', () => {
    it('should get all lgas in a state', () => __awaiter(void 0, void 0, void 0, function* () {
        const state = 'Lagos';
        const region = 'South West';
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/api/v1/nigeria/${region}/${state}/lgas`)
            .set('apikey', '82hikjenf719&#Y*@!IKN877y');
        expect(response.status).toBe(200);
        expect(response.body.nos).toBeGreaterThanOrEqual(1);
        expect(response.body.data[0]._id).toBeDefined();
        expect(response.body.data[0].name).toBeDefined();
    }));
    it('should get all lgas in a region', () => __awaiter(void 0, void 0, void 0, function* () {
        const region = 'South West';
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/api/v1/nigeria/${region}/lgas`)
            .set('apikey', '82hikjenf719&#Y*@!IKN877y');
        expect(response.status).toBe(200);
        expect(response.body.nos).toBeGreaterThanOrEqual(1);
        expect(response.body.data[0]._id).toBeDefined();
        expect(response.body.data[0].name).toBeDefined();
        expect(response.body.data[0].state._id).toBe(response.body.data[1].state._id);
    }));
    it('should get all states in a region', () => __awaiter(void 0, void 0, void 0, function* () {
        const region = 'South East';
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/api/v1/nigeria/${region}/states`)
            .set('apikey', '82hikjenf719&#Y*@!IKN877y');
        expect(response.status).toBe(200);
        expect(response.body.nos).toBeGreaterThanOrEqual(1);
        expect(response.body.data[0]._id).toBeDefined();
        expect(response.body.data[0].name).toBeDefined();
        expect(response.body.data[0].region).toBe(response.body.data[1].region);
    }));
});
describe('Search endpoints', () => {
    it('should search for a lga', () => __awaiter(void 0, void 0, void 0, function* () {
        const keyword = 'Oluyole';
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/api/v1/nigeria/search?keyword=${keyword}`)
            .set('apikey', '82hikjenf719&#Y*@!IKN877y');
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Found result in Lga');
    }));
    it('should search for a state', () => __awaiter(void 0, void 0, void 0, function* () {
        const keyword = 'Anambra';
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/api/v1/nigeria/search?keyword=${keyword}`)
            .set('apikey', '82hikjenf719&#Y*@!IKN877y');
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Found result in State');
    }));
    it('should search for a region', () => __awaiter(void 0, void 0, void 0, function* () {
        const keyword = 'SOuth EAST';
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/api/v1/nigeria/search?keyword=${keyword}`)
            .set('apikey', '82hikjenf719&#Y*@!IKN877y');
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Found result in Region');
    }));
});
function beforeAll(arg0) {
    throw new Error('Function not implemented.');
}
function afterAll(arg0) {
    throw new Error('Function not implemented.');
}
function expect(status) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=locale.endpoints.test.js.map