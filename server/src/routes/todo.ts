import { Context } from 'koa';
import Router from 'koa-router';
import TodoService from '../services/todo';
import { StatusCode } from '../utils/enum';
import createRes from '../utils/response';
import Config from "../config";
const todoService = new TodoService();
const todoRouter = new Router({
  prefix: '/api/todos',
});

todoRouter
  .get('/search', async (ctx: Context) => {
    const { userId, query } = ctx.query;
    try {
      const data = await todoService.searchTodo(userId, query);
      if (data) {
        createRes({
          ctx,
          data,
        });
      }
    } catch (error) {
      createRes({
        ctx,
        errorCode: 1,
        msg: error.message,
      });
    }
  })
  .get('/:userId', async (ctx: Context) => {
    const userId = ctx.params.userId;
    try {
      const data = await todoService.getAllTodos(userId);
      if (data) {
        createRes({
          ctx,
          data,
        });
      }
    } catch (error) {
      createRes({
        ctx,
        errorCode: 1,
        msg: error.message,
      });
    }
  })
    .get('/:userId/my', async (ctx: Context) => {
      const userId = ctx.params.userId;
      try {
        const data = await todoService.getMyTodos(userId);
        if (data) {
          createRes({
            ctx,
            data,
          });
        }
      } catch (error) {
        createRes({
          ctx,
          errorCode: 1,
          msg: error.message,
        });
      }
    })






    .get('/:todoId', async (ctx: Context) => {
      const todoId = ctx.params.todoId;
      try {
        const data = await todoService.fetchAllGoods(todoId)
        if (data) {
          createRes({
            ctx,
            data,
          });
        }
      } catch (error) {
        createRes({
          ctx,
          errorCode: 1,
          msg: error.message,
        });
      }
    })
  .put('/status', async (ctx: Context) => {
    const payload = ctx.request.body;

    const { todoId ,value} = payload;
    try {
      const data = await todoService.updateTodoStatus(todoId,value);
      if (data) {
        createRes({ ctx, statusCode: StatusCode.Accepted });
      }
    } catch (error) {
      createRes({
        ctx,
        errorCode: 1,
        msg: error.message,
      });
    }
  })
    .put('/desc', async (ctx: Context) => {
      const payload = ctx.request.body;

      const { todoId ,desc} = payload;
      try {
        const data = await todoService.updateTodoDesc(todoId,desc);
        if (data) {
          createRes({ ctx, statusCode: StatusCode.Accepted });
        }
      } catch (error) {
        createRes({
          ctx,
          errorCode: 1,
          msg: error.message,
        });
      }
    })
    .put('/info2', async (ctx: Context) => {
      const payload = ctx.request.body;

      const { todoId ,info2} = payload;
      try {
        const data = await todoService.updateTodoInfo2(todoId,info2);
        if (data) {
          createRes({ ctx, statusCode: StatusCode.Accepted });
        }
      } catch (error) {
        createRes({
          ctx,
          errorCode: 1,
          msg: error.message,
        });
      }
    })
    .put('/buyerId', async (ctx: Context) => {
      const payload = ctx.request.body;

      const { todoId ,bId} = payload;
      try {
        const data = await todoService.updateTodoBuyerId(todoId,bId);
        if (data) {
          createRes({ ctx, statusCode: StatusCode.Accepted });
        }
      } catch (error) {
        createRes({
          ctx,
          errorCode: 1,
          msg: error.message,
        });
      }
    })


  .put('/content', async (ctx: Context) => {
    const payload = ctx.request.body;
    const { todoId, content ,price} = payload;
    try {
      const data = await todoService.updateTodoContent(todoId, content,price);
      if (data) {
        createRes({ ctx, statusCode: StatusCode.Accepted });
      }
    } catch (error) {
      createRes({
        ctx,
        errorCode: 1,
        msg: error.message,
      });
    }
  })

    // .put('/url', async (ctx: Context) => {
    //   const payload = ctx.request.body;
    //   const { todoId, content,pri } = payload;
    //   try {
    //     const data = await todoService.updateTodoContent(todoId, content,price);
    //     if (data) {
    //       createRes({ ctx, statusCode: StatusCode.Accepted });
    //     }
    //   } catch (error) {
    //     createRes({
    //       ctx,
    //       errorCode: 1,
    //       msg: error.message,
    //     });
    // //   }
    // // })
    // .put('/field', async (ctx: Context) => {
    //   const payload = ctx.request.body;
    //   const { todoId, field } = payload;
    //   try {
    //     const data = await todoService.updateTodoContent(todoId, field);
    //     if (data) {
    //       createRes({ ctx, statusCode: StatusCode.Accepted });
    //     }
    //   } catch (error) {
    //     createRes({
    //       ctx,
    //       errorCode: 1,
    //       msg: error.message,
    //     });
    //   }
    // })

  .post('/', async (ctx: Context) => {
    const payload = ctx.request.body;
    const { userId, content,field ,url,position,price,info1,desc} = payload;
    try {
      const data = await todoService.addTodo(userId, content,field,url,position,price,info1,desc);
      if (data) {
        createRes({
          ctx,
          statusCode: StatusCode.Created,
          data,
        });
      }
    } catch (error) {
      createRes({
        ctx,
        errorCode: 1,
        msg: error.message,
      });
    }
  })

  .delete('/:todoId/:userId', async (ctx: Context) => {
    const todoId = ctx.params.todoId;
    const userId = ctx.params.userId;
    try {
      const data = await todoService.deleteTodo(userId,todoId);
      if (data) {
        createRes({ ctx, statusCode: StatusCode.NoContent });
      }
    } catch (error) {
      createRes({
        ctx,
        errorCode: 1,
        msg: error.message,
      });
    }
  });

export default todoRouter;
