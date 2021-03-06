import { Document, Schema } from 'mongoose';
import { ITodo } from './todo';

export interface IUser extends Document {
  usr: string;
  psd: string;
  todos: ITodo[];
  mybuy:ITodo[];
  position:string;
  info1:string;
}

export const UserSchema: Schema = new Schema({
  usr: {
    type: String,
    required: true,
    unique: true,
  },
  psd: {
    type: String,
    required: true,
  },

  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Todo',
    },
  ],
  mybuy: [
      {

        type: Schema.Types.ObjectId,
        ref: 'Todo',
  }
  ],
  position:{type:String,
  default:'-1'}
  ,
  info1:{
    type:String,
    default:'0'
  }
  ,


});
