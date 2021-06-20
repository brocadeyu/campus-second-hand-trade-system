import request from './request';

class UserAPI {
  public static PREFIX = '/users';
  public login(username: string, password: string) {
    return request.post(`${UserAPI.PREFIX}/login`, {
      username,
      password,
    });
  }
  public fetchuser(userId: string) {
    return request.get(`${UserAPI.PREFIX}/${userId}`);
  }
  public register(username: string, password: string) {
    return request.post(`${UserAPI.PREFIX}`, {
      username,
      password,
    });
  }
  public updateposition(userId: string,position:string) {
    return request.put(`${UserAPI.PREFIX}/position`, {
      userId,position
    });
  }
  public updateinfo1(userId: string,info1:string) {
    return request.put(`${UserAPI.PREFIX}/info1`, {
      userId,info1
    });
  }
}

export default UserAPI;
