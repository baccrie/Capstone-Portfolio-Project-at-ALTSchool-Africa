import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';
import { connectDB } from '../../db/connect';
import User from '../../models/user';
import dropDatabase from '../jest.teardown';
import { connectToDatabase } from '../jest.setup';

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
    expect(response.body.nos).toBeGreaterThan(0);
    expect(response.body.nos).toBeLessThan(7);
    expect(response.body.data.length).toBe(response.body.nos);
  });

  it('should get all states', async () => {
    const response = await request(app)
      .get('/api/v1/nigeria/states')
      .set('apikey', '82hikjenf719&#Y*@!IKN877y');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.nos).toBeGreaterThan(0);
    expect(response.body.noOfPages).toBeGreaterThan(0);
  });

  it('should get all lgas', async () => {
    const response = await request(app)
      .get('/api/v1/nigeria/lgas')
      .set('apikey', '82hikjenf719&#Y*@!IKN877y');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.nos).toBeGreaterThan(0);
    expect(response.body.noOfPages).toBeGreaterThan(0);
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
    expect(response.body.nos).toBeGreaterThanOrEqual(1);
    expect(response.body.data[0]._id).toBeDefined();
    expect(response.body.data[0].name).toBeDefined();
  });

  it('should get all lgas in a region', async () => {
    const region = 'South West';

    const response = await request(app)
      .get(`/api/v1/nigeria/${region}/lgas`)
      .set('apikey', '82hikjenf719&#Y*@!IKN877y');
    expect(response.status).toBe(200);
    expect(response.body.nos).toBeGreaterThanOrEqual(1);
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
    expect(response.body.nos).toBeGreaterThanOrEqual(1);
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
function beforeAll(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}

function afterAll(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}

function expect(status: number) {
  throw new Error('Function not implemented.');
}
