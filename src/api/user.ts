import { get, post } from '../utils/request';

export interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  email: string;
  roles: string[];
  permissions: string[];
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResult {
  token: string;
  userInfo: UserInfo;
}

/**
 * 用户登录
 * @param params 登录参数
 */
export function login(params: LoginParams): Promise<LoginResult> {
  return post<LoginResult>('/user/login', params);
}

/**
 * 获取用户信息
 */
export function getUserInfo(): Promise<UserInfo> {
  return get<UserInfo>('/user/info');
}

/**
 * 用户登出
 */
export function logout(): Promise<void> {
  return post<void>('/user/logout');
}

/**
 * 获取用户列表
 * @param params 查询参数
 */
export function getUserList(params: { page: number; pageSize: number; keyword?: string }): Promise<{ list: UserInfo[]; total: number }> {
  return get('/user/list', params);
}
