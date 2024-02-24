import { model, Schema } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
  email: string;
  api_key: string;
  is_superUser: boolean;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'please provide a username'],
  },

  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    unique: true,
  },

  password: {
    type: String,
    required: [true, 'password cannot be empty'],
    trim: true,
  },

  api_key: {
    type: String,
    required: [true, 'api-key exists'],
    unique: true,
  },

  is_superUser: {
    type: Boolean,
    default: false,
  },
});

export default model<IUser>('User', userSchema);
