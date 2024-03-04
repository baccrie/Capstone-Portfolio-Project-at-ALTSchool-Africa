import { model, Schema } from 'mongoose';

export interface ILga {
  [x: string]: any;
  _id: Schema.Types.ObjectId;
  name: string;
  state: Schema.Types.ObjectId;
  region: Schema.Types.ObjectId;
}

const lgaSchema = new Schema<ILga>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    state: {
      type: Schema.Types.ObjectId,
      ref: 'State',
      required: true,
    },

    region: {
      type: Schema.Types.ObjectId,
      ref: 'Region',
      required: true,
    },
  },
  { timestamps: false }
);

export default model<ILga>('Lga', lgaSchema);
