import { model, Schema } from 'mongoose';

export interface IRegion {
  _id: Schema.Types.ObjectId;
  name: string;
  states: Schema.Types.ObjectId;
  description: string;
  major_ethnic_group: string[];
}

const regionSchema = new Schema<IRegion>(
  {
    name: {
      type: String,
      required: [true, 'name cannot be empty'],
      unique: true,
    },

    states: [
      {
        type: Schema.Types.ObjectId,
        ref: 'State',
      },
    ],

    description: {
      type: String,
      required: true,
    },

    major_ethnic_group: [
      {
        type: String,
      },
    ],
  },
  { timestamps: false }
);

export default model<IRegion>('Region', regionSchema);
