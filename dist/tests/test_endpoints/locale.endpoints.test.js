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
        expect(response.body.data.length).toBe(response.body.nos);
    }));
    it('should get all states', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/api/v1/nigeria/states')
            .set('apikey', '82hikjenf719&#Y*@!IKN877y');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
    }));
    it('should get all lgas', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/api/v1/nigeria/lgas')
            .set('apikey', '82hikjenf719&#Y*@!IKN877y');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
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
        expect(response.body.data[0]._id).toBeDefined();
        expect(response.body.data[0].name).toBeDefined();
    }));
    it('should get all lgas in a region', () => __awaiter(void 0, void 0, void 0, function* () {
        const region = 'South West';
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/api/v1/nigeria/${region}/lgas`)
            .set('apikey', '82hikjenf719&#Y*@!IKN877y');
        expect(response.status).toBe(200);
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
describe('Create Region, State and Lga endpoints', () => {
    it('should create a region', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/v1/nigeria/region')
            .send({
            name: 'Test-region',
            description: 'Testing post region endpoints',
            major_ethnic_group: ['kanuri'],
        })
            .set('apikey', '82hikjenf719&#Y*@!IKN877y');
        expect(res.status).toBe(201);
        expect(res.body.status).toBe('success');
        expect(res.body.data.name).toBe('Test-Region');
        //expect(res.body.data.states).toBe([]);
        //expect(res.body.data.major_ethnic_group).toBe(['kanuri']);
        expect(res.body.data.description).toBe('Testing post region endpoints');
    }));
    it('should create a state', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/v1/nigeria/Test-RegiON/state')
            .send({
            name: 'Westeros',
            capital: 'kings landing',
            slogan: 'The Seven kingdoms',
            established: 'october 1st 576AD',
            area: '340,059 km2 (1,313,150 sq mi)',
            postal_code: 'null',
            website: 'null',
            coordinate: 'null',
            population: {},
            description: 'The Seven Kingdoms',
            ethnic_groups: ['string'],
            institutions: ['string'],
        })
            .set('apikey', '82hikjenf719&#Y*@!IKN877y');
        expect(res.status).toBe(201);
        expect(res.body.status).toBe('success');
        expect(res.body.data.name).toBe('Westeros');
        expect(res.body.data.capital).toBe('kings landing');
        expect(res.body.data.description).toBe('The Seven Kingdoms');
    }));
    it('should create a lga', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/v1/nigeria/Westeros/lga')
            .send({
            name: 'kings-landing',
        })
            .set('apikey', '82hikjenf719&#Y*@!IKN877y');
        expect(res.status).toBe(201);
        expect(res.body.status).toBe('success');
        expect(res.body.data.name).toBe('Kings-Landing');
        //expect(res.body.data.states).toBe([]);
        //expect(res.body.data.major_ethnic_group).toBe(['kanuri']);
        //expect(res.body.data.description).toBe('Testing post region endpoints');
    }));
});
describe('Update Region, State and Lga endpoints', () => {
    it('should update a region', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .patch('/api/v1/nigeria/update/region/Test-REGION')
            .send({
            name: 'Tested-RegioN',
            description: 'Testing update region endpoints',
            major_ethnic_group: ['kanuri', 'kalahari'],
        })
            .set('apikey', '82hikjenf719&#Y*@!IKN877y');
        expect(res.status).toBe(201);
        expect(res.body.status).toBe('success');
        expect(res.body.data.name).toBe('Tested-Region');
        //expect(res.body.data.states).toBe([]);
        //expect(res.body.data.major_ethnic_group).toBe(['kanuri']);
        expect(res.body.data.description).toBe('Testing update region endpoints');
    }));
    it('should update a state', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .patch('/api/v1/nigeria/update/state/Tested-Region/Westeros')
            .send({
            name: 'driftmark',
            capital: 'kings landing',
            slogan: 'The Seven kingdoms',
            established: 'october 1st 576AD',
            area: '340,059 km2 (1,313,150 sq mi)',
            postal_code: 'null',
            website: 'null',
            coordinate: 'null',
            population: {},
            description: 'The Seven Kingdoms',
            ethnic_groups: ['string'],
            institutions: ['string'],
        })
            .set('apikey', '82hikjenf719&#Y*@!IKN877y');
        expect(res.status).toBe(201);
        expect(res.body.status).toBe('success');
        expect(res.body.data.name).toBe('Driftmark');
        expect(res.body.data.capital).toBe('kings landing');
        expect(res.body.data.description).toBe('The Seven Kingdoms');
    }));
    it('should update a lga', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .patch('/api/v1/nigeria/update/lga/Driftmark/Kings-Landing')
            .send({
            name: 'Storms-End',
        })
            .set('apikey', '82hikjenf719&#Y*@!IKN877y');
        expect(res.status).toBe(201);
        expect(res.body.status).toBe('success');
        expect(res.body.data.name).toBe('Storms-End');
        //expect(res.body.data.states).toBe([]);
        //expect(res.body.data.major_ethnic_group).toBe(['kanuri']);
        //expect(res.body.data.description).toBe('Testing post region endpoints');
    }));
});
//# sourceMappingURL=locale.endpoints.test.js.map