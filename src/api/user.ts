import { get, post } from '../utils/request';

export interface UserInfo {
  userId: number | string;
  nickname: string;
  avatarUrl: string;
  followings: number;
  followers: number;
  likes: number;
  description: string;
  // TODO: 这是什么？
  nationalityId: number;
  // TODO: oc是多个
  ocId: number;
  urls: {
    url: string;
    name: string;
  }[];
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface SigninParams {
  username: string;
  password: string;
  email: string;
  code: string;
}

export interface LoginResult {
  token: string;
  userInfo: UserInfo;
}

/**
 * 注册
 */

export function signinApi(params: SigninParams): Promise<SigninResult> {
  return post<SigninResult>('/account/user', params);
}

/**
 * 用户登录
 * @param params 登录参数
 */
export function loginApi(params: LoginParams): Promise<LoginResult> {
  return post<LoginResult>('/account/auth/token', params);
}

/**
 * 获取用户信息
 */
export function getUserInfoApi(userId: string | number): Promise<UserInfo> {
  return get<UserInfo>(`/account/user/${userId}`);
}

/**
 * 用户登出
 */
export function logout(): Promise<void> {
  return post<void>('/account/logout');
}

/**
 * 获取用户列表
 * @param params 查询参数
 */
export function getUserList(params: { page: number; pageSize: number; keyword?: string }): Promise<{ list: UserInfo[]; total: number }> {
  return get('/user/list', params);
}


// 用户消息
// 1, "私信"
// 2, "评论"
// 3, "回复"
// 4, "赞"
// 5, "扩"
// 6,"关注"
// 7, "收藏"
// 8, "@"
// 9, "系统"

export function getUserMessageApi(data: any) {
  return post('/account/msg/other', data);
}
