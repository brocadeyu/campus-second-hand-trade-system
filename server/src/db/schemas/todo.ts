import { Document, Schema } from 'mongoose';



export interface ITodo extends Document {
  content: string;
  field:string;
  status: string;
  buyerId:string;
  usr:string;
  url:string;
  price:number;
  position:string;
  startime:Date;
  info1:string;
  info2:string;
  desc:string;

}
//定义数据结构
export const TodoSchema: Schema = new Schema({
  content: String,
  startime:{ type:Date,
  default:Date.now,

  },
  status: {type: String, default: '0'},
  usr:String,
  userId:String,
  buyerId:{ type: String,default:'0'},
  field:String,
  url:{type: String,default:'0'},
  position:{type:String,default:'-1'},
  price:{type:String,default:''},
  info1:{type:String,default:''},
  info2:{type:String,default:''},
  desc:{type:String,default:''}
});

TodoSchema.index({ content: 'text' ,field:'',url:'text'});
