import Todo from '../db/models/todo';
import User from '../db/models/user';

export default class TodoService {
  //添加
  public async addTodo(userId: string, content: string,field:string,url:string,position:string,price:number,info1:string,desc:string) {
    const todo = new Todo({
      userId,content,field,url,position,price,info1,desc
    });
    try {
      const res = await todo.save();
      const user = await User.findById(userId);
      user?.todos.push(res.id);
      await user?.save();
      return res;
    } catch (error) {
      throw new Error('新增失败 (￣o￣).zZ');
    }
  }
  //删除
  public async deleteTodo(userId:string,todoId: string) {
    try {
      return await Todo.findByIdAndDelete(todoId);
    } catch (error) {
      throw new Error('删除失败 (￣o￣).zZ');
    }
  }
  // public async deleteTodo(userId:string,todoId: string) {
  //   try { const user=await User.findById(userId);
  //     console.log(todoId);
  //     const res =await Todo.findById(todoId);
  //     if(res){return   user?.todos.filter(res._id);}
  //
  //     else {
  //       return await Todo.findByIdAndDelete(todoId);
  //
  //     }
  //
  //   } catch (error) {
  //     throw new Error('删除失败 (￣o￣).zZ');
  //   }
  // }

  // public async deleteTodo(userId:string , todoId: string) {
  //   try {const res=await Todo.findByIdAndDelete(todoId);
  //     const user = await User.findById(userId);
  //     user?.todos.filter(res.id);
  //     return  res;
  //   } catch (error) {
  //     throw new Error('删除失败 (￣o￣).zZ');
  //   }
  // }
  //







  //依ID来获取
  // public async getAllTodos(userId: string) {
  //   try {
  //     const res = await User.findById(userId).populate('todos');
  //                                                //关联查找
  //     return res?.todos;
  //   } catch (error) {
  //     throw new Error('获取失败 (￣o￣).zZ');
  //   }
  // }
//20210502
  public async getMyTodos(userId: string) {
    try {
      const res = await User.findById(userId).populate('todos');
  //关联查找
      return res?.todos;
    } catch (error) {
      throw new Error('获取失败 (￣o￣).zZ');
    }
  }








//改动
  public async getAllTodos(userId: string) {
    try {
      const res = await Todo.find()
      return res;
    } catch (error) {
      throw new Error('获取失败 (￣o￣).zZ');
    }
  }
  //获取全部ToDo
  public async fetchAllGoods(todoId: string) {
    try {
      const res = await Todo.findById(todoId);
      return res;
    } catch (error) {
      throw new Error('获取失败 (￣o￣).zZ');
    }
  }
  //更新状态
  public async updateTodoStatus(todoId: string,value:string) {
    try {
      const oldRecord = await Todo.findById(todoId);
      const record = await Todo.findByIdAndUpdate(todoId, {
        status: value,
      });
      return record;
    } catch (error) {
      throw new Error('更新状态失败 (￣o￣).zZ');
    }
  }
  public async updateTodoDesc(todoId: string,desc:string) {
    try {
      const oldRecord = await Todo.findById(todoId);
      const record = await Todo.findByIdAndUpdate(todoId, {
        desc: desc,
      });
      return record;
    } catch (error) {
      throw new Error('更新状态失败 (￣o￣).zZ');
    }
  }
  public async updateTodoInfo2(todoId: string,info2:string) {
    try {
      const oldRecord = await Todo.findById(todoId);
      const record = await Todo.findByIdAndUpdate(todoId, {
        info2: info2,
      });
      return record;
    } catch (error) {
      throw new Error('更新状态失败 (￣o￣).zZ');
    }
  }
  public async updateTodoBuyerId(todoId: string,bId:string) {
    try {


      return await Todo.findByIdAndUpdate(todoId, {
        buyerId: bId,
      });
    } catch (error) {
      throw new Error('更新状态失败 (￣o￣).zZ');
    }
  }

  //更新内容
  public async updateTodoContent(todoId: string, content: string,price:number) {
    try {
      return await Todo.findByIdAndUpdate(todoId, { content:content,price:price });
    } catch (error) {
      throw new Error('更新内容失败 (￣o￣).zZ');
    }
  }

  public async updateTodoField(todoId: string, field: string) {
    try {
      return await Todo.findByIdAndUpdate(todoId, { field });
    } catch (error) {
      throw new Error('更新内容失败 (￣o￣).zZ');
    }
  }








  //查找
  public async searchTodo(userId: string, query: string) {
    try {
      // MongoDB Text Search 对中文支持不佳
      // e.g. 当 query 为“你好”，“你好张三"不匹配，”你好，张三“匹配
      // return await User.findById(userId).populate({
      //   path: 'todos',
      //   match: { $text: { $search: query } },
      // });
      return await User.findById(userId).populate({
        path: 'todos',
        match: { content: { $regex: new RegExp(query), $options: 'i' } },
      });
    } catch (error) {
      console.log(error);
      throw new Error('查询失败 (￣o￣).zZ');
    }
  }
}
