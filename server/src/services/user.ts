import User from '../db/models/user';
import Todo from "../db/models/todo";

export default class UserService {
  public async addUser(usr: string, psd: string,) {
    try {
      const user = new User({
        usr,
        psd,

        todos: [],
      });
      return await user.save();
    } catch (error) {
      if (error.code === 11000) {
        // MongoError: E11000 duplicate key error collection
        throw new Error('用户名已存在 (￣o￣).zZ');
      } else {
        throw error;
      }
    }
  }
  public async validUser(usr: string, psd: string) {
    try {
      const user = await User.findOne({
        usr,
      });
      // 查询用户
      if (!user) {
        throw new Error('用户不存在 (￣o￣).zZ');
      }
      // 校验密码
      if (psd === user.psd) {
        return user;
      }
      throw new Error('密码错误 (￣o￣).zZ');
    } catch (error) {
      throw new Error(error.message);
    }
  }
  public async updateposition(userId: string,position:string) {
    try {


      const data= await User.findByIdAndUpdate(userId, {
        position: position,
      });
      return  data ;
    } catch (error) {
      throw new Error('更新状态失败 (￣o￣).zZ');
    }
  }
  public async updateinfo1(userId: string,info1:string) {
    try {


      const data = await User.findByIdAndUpdate(userId, {
        info1: info1,
      });
      return  data ;
    } catch (error) {
      throw new Error('更新信息失败 (￣o￣).zZ');
    }
  }
  public async fetchuser(userId: string) {
    try {
      const res = await User.findById(userId);
      return res;
    } catch (error) {
      throw new Error('获取失败 (￣o￣).zZ');
    }
  }
}
