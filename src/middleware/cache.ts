import Redis from 'ioredis';
import { Request, Response, NextFunction } from 'express';
import Region, { IRegion } from '../models/region';
import Lga, { ILga } from '../models/lga';
import State, { IState } from '../models/state';
import { capitalize, trim } from '../utils/capitalize-first-letter';

// errors
import BadRequestError from '../errors/bad-request';

interface retData {
  length: Number;
}

const  REDIS_URL:any  = process.env.REDIS_URL;
const tls: any = true
const username: any = process.env.REDIS_SERVICE_NAME
const host: any = process.env.REDIS_HOST
const password:any = process.env.REDIS_PASSWORD
const port: any = process.env.REDIS_PORT


const redisClient  = new Redis(REDIS_URL);

// locale endpoints

// general endpoints
export async function getAllR(req: Request, res: Response, next: NextFunction) {
  try {
    const cachedResults = await redisClient.get('getAllRegions');

    if (cachedResults) {
      const data = JSON.parse(cachedResults);
      res.status(200).json({
        status: 'success',
        nos: data.length,
        data,
      });
    } else {
      const data = await Region.find()
        .select('-__v')
        .populate('states', '-_id name capital slogan');
      await redisClient.set('getAllRegions', JSON.stringify(data), 'EX', 100);
      next();
    }
  } catch (err) {
    next(err);
  }
}

export async function getAllS(req: Request, res: Response, next: NextFunction) {
  try {
    const cachedResults = await redisClient.get('getAllStates');

    if (cachedResults) {
      const { data, noOfPages } = JSON.parse(cachedResults);

      res.status(200).json({
        status: 'success',
        nos: data.length,
        noOfPages,
        data,
      });
    } else {
      // let { limit, page } = req.query;
      let limit: number = parseInt(req.query.limit as string);
      let page: number = parseInt(req.query.page as string);

      const totalNo = await State.find().countDocuments({});
      let states = State.find()
        .select('-lgas -__v')
        .populate('region', '-_id name');

      // check if client is willing to paginate
      if (limit || page) {
        limit = Number(limit) || 6;
        page = Number(page) || 1;

        const skip: number = (page - 1) * limit;
        states = states.skip(skip).limit(limit);
      }

      const noOfPages = Math.ceil(totalNo / limit) || 1;
      let data: any = {};
      data.data = await states;
      data.noOfPages = noOfPages;

      await redisClient.set('getAllStates', JSON.stringify(data), 'EX', 100);

      if (!data || data.length < 1) {
        throw new BadRequestError('Invalid query.');
      }

      next();
    }
  } catch (err) {
    next(err);
  }
}

export async function getAllL(req: Request, res: Response, next: NextFunction) {
  try {
    // let { limit, page } = req.query;
    let limit: number = parseInt(req.query.limit as string);
    let page: number = parseInt(req.query.page as string);

    const cachedResults = await redisClient.get('getAllLgas');

    if (cachedResults) {
      const { data, noOfPages } = JSON.parse(cachedResults);

      res.status(200).json({
        status: 'success',
        nos: data.length,
        noOfPages,
        data: data,
      });
    } else {
      const totalNo = await Lga.find().countDocuments({});
      let lgas = Lga.find()
        .populate('region', '-_id name')
        .populate('state', '-_id name');

      // check if clients is willing to paginate
      if (limit || page) {
        limit = Number(limit) || 50;
        page = Number(page) || 1;

        const skip = (page - 1) * limit;
        lgas = lgas.skip(skip).limit(limit);
      }

      const noOfPages = Math.ceil(totalNo / limit) || 1;

      let data: any = {};
      data.data = await lgas;
      data.noOfPages = noOfPages;

      await redisClient.set('getAllLgas', JSON.stringify(data), 'EX', 100);
      next();
      if (!data || data.length < 1) {
        throw new BadRequestError('Invalid query.');
      }
    }
  } catch (err) {
    next(err);
  }
}
