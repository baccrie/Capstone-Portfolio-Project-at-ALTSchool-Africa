import { model, Schema } from 'mongoose';

export interface IState {
  _id: Schema.Types.ObjectId;
  name: string;
  capital: string;
  slogan: string;
  established: string;
  area: string;
  ethnic_groups: string[];
  population: object;
  region: Schema.Types.ObjectId;
  postal_code: string;
  website: string;
  coordinate: string;
  description: string;
  lgas: Schema.Types.ObjectId;
  institutions: string;
}

const stateSchema = new Schema<IState>(
  {
    name: {
      type: String,
      // unique: [true, 'name already exists'],
      required: [true, 'name cannot be empty'],
    },

    capital: {
      type: String,
      required: [true, 'capital cannot be empty'],
    },

    slogan: {
      type: String,
      required: [true, 'slogan cannot be empty'],
    },

    established: {
      type: String,
      required: [true, 'establshed cannot be empty'],
    },

    area: {
      type: String,
      required: [true, 'area cannot be empty'],
    },

    ethnic_groups: [
      {
        type: String,
      },
    ],

    population: {
      total: String,
      estimate: String,
      density: String,
    },

    region: {
      type: Schema.Types.ObjectId,
      ref: 'Region',
      required: [true, 'must be present'],
    },

    postal_code: {
      type: String,
      required: [true, 'postal_code cannot be empty'],
    },

    website: {
      type: String,
      required: [true, 'website cannot be empty'],
    },

    coordinate: {
      type: String,
      required: [true, 'coordinate cannot be empty'],
    },

    description: {
      type: String,
      required: [true, 'description cannot be empty'],
    },

    lgas: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Lga',
      },
    ],

    institutions: [
      {
        type: String,
        required: true,
      },
    ],
  },

  { timestamps: false }
);

export default model<IState>('State', stateSchema);
