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

// general endpoints controllers
export async function getAllRegions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await Region.find()
      .select('-__v')
      .populate('states', '-_id name capital slogan');

      if (!data || data.length < 1) {
        throw new BadRequestError('No Region found.');
      }

    res.status(200).json({
      status: 'success',
      nos: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllStates(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // let { limit, page } = req.query;
  let limit: number = parseInt(req.query.limit as string);
  let page: number = parseInt(req.query.page as string);

  try {
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
    const data = await states;

    if (!data || data.length < 1) {
      throw new BadRequestError('No State found.');
    }

    res.status(200).json({
      status: 'success',
      nos: data.length,
      noOfPages,
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllLgas(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let limit: number = parseInt(req.query.limit as string);
  let page: number = parseInt(req.query.page as string);

  try {
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
    const data = await lgas;

    // check for empty result set
    if (!data || data.length < 1) {
      throw new BadRequestError('No Lga found.');
    }

    res.status(200).json({
      status: 'success',
      nos: data.length,
      noOfPages,
      data: data,
    });
  } catch (error) {
    next(error);
  }
}

// search endpoint
export async function search(req: Request, res: Response, next: NextFunction) {
  try {
    let keyword: any = req.query.keyword;
    let data;

    keyword = capitalize(keyword);

    // check region
    data = await Region.findOne({ name: keyword }).populate('states', '-lgas');

    if (!data) {
      data = await State.findOne({ name: keyword })
        .populate('lgas', 'name region')
        .populate('region', 'name')
        .select('-__v');
    }

    if (!data) {
      let key: any = req.query.keyword;
      key = trim(key);

      data = await Lga.findOne({ name: key })
        .select('-__v')
        .populate('state', '-_id name capital')
        .populate('region', '-_id name');
    }

    if (!data || data === null) {
      throw new BadRequestError(
        'Invalid search key, search by state, lga or region name pls..'
      );
    }

    const resType =
      data instanceof State
        ? 'State'
        : data instanceof Region
        ? 'Region'
        : 'Lga';

    res.status(200).json({
      status: 'success',
      msg: `Found result in ${resType}`,
      data,
    });
  } catch (error) {
    next(error);
  }
}

// specific endpoints controllers
export async function lgasInRegion(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // validate with joi

  let limit: number = parseInt(req.query.limit as string);
  let page: number = parseInt(req.query.page as string);
  let { region } = req.params;

  try {
    region = capitalize(region);
    const getRegion = await Region.findOne({
      name: region,
    });

    // check region validity
    if (!getRegion) {
      throw new BadRequestError('The region is invalid....');
    }

    // get lgas in Region
    const totalNo = await Lga.find({
      region: getRegion._id,
    }).countDocuments({});
    let lga = Lga.find({
      region: getRegion._id,
    })
      .select('name state')
      .populate('state', 'name capital');

    // ckeck if client is willing to paginate
    if (limit || page) {
      limit = Number(limit) || 20;
      page = Number(page) || 1;

      const skip = (page - 1) * limit;
      lga = lga.skip(skip).limit(limit);
    }

    const noOfPages = Math.ceil(totalNo / limit) || 1;
    const data = await lga;

    if (!data || data.length < 1) {
      throw new BadRequestError('Invalid query.');
    }

    res.status(200).json({
      status: 'success',
      nos: data.length,
      noOfPages,
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function lgasInState(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let { state, region } = req.params;
  let limit: number = parseInt(req.query.limit as string);
  let page: number = parseInt(req.query.page as string);

  try {
    state = capitalize(state);
    region = capitalize(region);

    const getRegion = await Region.findOne({
      name: region,
    });
    const getState: any = await State.findOne({
      name: state,
    }).populate('region', 'name');

    const getRegionName: any = await Region.findOne({ _id: getState.region });

    // check region existence
    if (!getRegion) {
      throw new BadRequestError('The region is invalid...');
    }

    // check state existence
    if (!getState) {
      throw new BadRequestError('The state is invalid...');
    }

    // check existence of state in region
    if (!(getRegionName.name === getRegion.name)) {
      throw new BadRequestError(
        'The state dosent exist for the particular region...'
      );
    }

    const totalNo = await Lga.find({
      state: getState._id,
      region: getRegion._id,
    }).countDocuments({});

    let lga = Lga.find({
      state: getState._id,
      region: getRegion._id,
    }).select('name');

    // check if client is willing to paginate
    if (limit || page) {
      limit = Number(limit) || 5;
      page = Number(page) || 1;

      const skip = (page - 1) * limit;
      lga = lga.skip(skip).limit(limit);
    }

    const data = await lga;
    const noOfPages = Math.ceil(totalNo / limit) || 1;

    if (!data || data.length < 1) {
      throw new BadRequestError('Invalid query.');
    }

    res.status(200).json({
      status: 'success',
      nos: data.length,
      noOfPages,
      data,
    });
  } catch (err) {
    next(err);
  }
}

export async function statesInRegion(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let { region } = req.params;
  try {
    region = capitalize(region);
    const getRegion = await Region.findOne({
      name: region,
    });

    if (!getRegion) {
      throw new BadRequestError('The region is invalid....');
    }

    const data = await State.find({
      region: getRegion._id,
    }).select('-lgas -__v');

    if (!data || data.length < 1) {
      throw new BadRequestError('Invalid query.');
    }

    res.status(200).json({
      status: 'success',
      nos: data.length,
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
