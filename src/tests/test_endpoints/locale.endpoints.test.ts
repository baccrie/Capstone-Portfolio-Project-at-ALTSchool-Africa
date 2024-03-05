import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';
import { connectDB } from '../../db/connect';
import User from '../../models/user';
import dropDatabase from '../jest.teardown';
import { connectToDatabase } from '../jest.setup';
import Region from '../../models/region';
import State from '../../models/state';
import Lga from '../../models/lga';

require('dotenv').config({ path: '../../../.env' });

beforeAll(async () => {
  await connectToDatabase();
});

afterAll(async () => {
  await dropDatabase();
});

describe('General endpoints', () => {
  it('should get all regions', async () => {
    const response = await request(app)
      .get('/api/v1/nigeria/regions')
      .set('apikey', '82hikjenf719&#Y*@!IKN877y');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.length).toBe(response.body.nos);
  });

  it('should get all states', async () => {
    const response = await request(app)
      .get('/api/v1/nigeria/states')
      .set('apikey', '82hikjenf719&#Y*@!IKN877y');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });

  it('should get all lgas', async () => {
    const response = await request(app)
      .get('/api/v1/nigeria/lgas')
      .set('apikey', '82hikjenf719&#Y*@!IKN877y');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });
});

describe('Specific endpoints', () => {
  it('should get all lgas in a state', async () => {
    const state = 'Lagos';
    const region = 'South West';

    const response = await request(app)
      .get(`/api/v1/nigeria/${region}/${state}/lgas`)
      .set('apikey', '82hikjenf719&#Y*@!IKN877y');
    expect(response.status).toBe(200);
    expect(response.body.data[0]._id).toBeDefined();
    expect(response.body.data[0].name).toBeDefined();
  });

  it('should get all lgas in a region', async () => {
    const region = 'South West';

    const response = await request(app)
      .get(`/api/v1/nigeria/${region}/lgas`)
      .set('apikey', '82hikjenf719&#Y*@!IKN877y');
    expect(response.status).toBe(200);
    expect(response.body.data[0]._id).toBeDefined();
    expect(response.body.data[0].name).toBeDefined();
    expect(response.body.data[0].state._id).toBe(
      response.body.data[1].state._id
    );
  });

  it('should get all states in a region', async () => {
    const region = 'South East';

    const response = await request(app)
      .get(`/api/v1/nigeria/${region}/states`)
      .set('apikey', '82hikjenf719&#Y*@!IKN877y');
    expect(response.status).toBe(200);
    expect(response.body.data[0]._id).toBeDefined();
    expect(response.body.data[0].name).toBeDefined();
    expect(response.body.data[0].region).toBe(response.body.data[1].region);
  });
});

describe('Search endpoints', () => {
  it('should search for a lga', async () => {
    const keyword = 'Oluyole';

    const response = await request(app)
      .get(`/api/v1/nigeria/search?keyword=${keyword}`)
      .set('apikey', '82hikjenf719&#Y*@!IKN877y');
    expect(response.status).toBe(200);
    expect(response.body.msg).toBe('Found result in Lga');
  });

  it('should search for a state', async () => {
    const keyword = 'Anambra';

    const response = await request(app)
      .get(`/api/v1/nigeria/search?keyword=${keyword}`)
      .set('apikey', '82hikjenf719&#Y*@!IKN877y');
    expect(response.status).toBe(200);
    expect(response.body.msg).toBe('Found result in State');
  });

  it('should search for a region', async () => {
    const keyword = 'SOuth EAST';

    const response = await request(app)
      .get(`/api/v1/nigeria/search?keyword=${keyword}`)
      .set('apikey', '82hikjenf719&#Y*@!IKN877y');
    expect(response.status).toBe(200);
    expect(response.body.msg).toBe('Found result in Region');
  });
});

describe('Create Region, State and Lga endpoints', () => {
  it('should create a region', async () => {
    const res = await request(app)
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
  });

  it('should create a state', async () => {
    const res = await request(app)
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
  });

  it('should create a lga', async () => {
    const res = await request(app)
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
  });
});

describe('Update Region, State and Lga endpoints', () => {
  it('should update a region', async () => {
    const res = await request(app)
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
  });

  it('should update a state', async () => {
    const res = await request(app)
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
  });

  it('should update a lga', async () => {
    const res = await request(app)
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
  });
});
