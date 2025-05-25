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
  return post<SigninResult>('/user', params);
}

/**
 * 用户登录
 * @param params 登录参数
 */
export function loginApi(params: LoginParams): Promise<LoginResult> {
  return post<LoginResult>('/auth/token', params);
}

/**
 * 获取用户信息
 */
export function getUserInfoApi(userId: string | number): Promise<UserInfo> {
  return get<UserInfo>(`/user/${userId}`);
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
