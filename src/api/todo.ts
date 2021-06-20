import request from './request';
import UserAPI from "./user";
class TodoAPI {
  public static PREFIX = '/todos';
  public fetchTodo(userId: string) {
    return request.get(`${TodoAPI.PREFIX}/${userId}`);
  }

  // public fetchTodo(userId: string) {
  //   return request.get(`${TodoAPI.PREFIX}/${userId}`);
  // }
  public fetchMyTodo(userId: string) {
    return request.get(`${TodoAPI.PREFIX}/${userId}/my`);
  }


  public fetchALLGoods(todoId: string) {
    return request.get(`${TodoAPI.PREFIX}/${todoId}`);
  }




  public addTodo(userId: string, content: string,field:string,url:string,position:string,price:number,info1:string,desc:string) {
    return request.post(`${TodoAPI.PREFIX}`, {
      userId,
      content,
field,
      url,
      position,price,info1,desc

    });
  }
  public searchTodo(userId: string, query: string) {
    return request.get(
      `${TodoAPI.PREFIX}/search?userId=${userId}&query=${query}`
    );
  }
  public deleteTodo(userId:string,todoId: string) {
    return request.delete(`${TodoAPI.PREFIX}/${todoId}/${userId}`);

  }
  ////删除user目录下的todo
  public deleteUserTodo(todoId: string,userId:string) {
    return request.delete(`${UserAPI.PREFIX}/${userId}/${todoId}`);

  }

  public updateTodoStatus(todoId: string,value:string) {
    return request.put(`${TodoAPI.PREFIX}/status`, {
      todoId,value
    });
  }
  public updateTodoDesc(todoId: string,desc:string) {
    return request.put(`${TodoAPI.PREFIX}/desc`, {
      todoId,desc
    });
  }
  public updateTodoInfo2(todoId: string,info2:string) {
    return request.put(`${TodoAPI.PREFIX}/info2`, {
      todoId,info2
    });
  }
  public updateTodoBuyerId(todoId: string,bId:string) {
    return request.put(`${TodoAPI.PREFIX}/buyerId`, {
      todoId,bId
    });
  }
  public updateTodoContent(todoId: string, content: string,price:number) {
    return request.put(`${TodoAPI.PREFIX}/content`, {
      todoId,
      content,
      price,
    });
  }
  public updateTodoField(todoId: string, field: string) {
    return request.put(`${TodoAPI.PREFIX}/field`, {
      todoId,
      field,
    });
  }
}

export default TodoAPI;
