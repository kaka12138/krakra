import { get, post, put, del } from '../utils/request';

/**
 * 通用的分页请求参数接口
 */
export interface PageParams {
  page: number;
  pageSize: number;
  [key: string]: any;
}

/**
 * 通用的分页响应接口
 */
export interface PageResult<T> {
  list: T[];
  total: number;
}

/**
 * 通用的上传文件方法
 * @param file 文件对象
 * @param type 文件类型，例如：avatar, attachment
 */
export function uploadFileApi(file: FormData): Promise<string> {
  return post('/storage/file', file)
}

/**
 * 通用的数据字典获取方法
 * @param dictType 字典类型
 */
export function getDictItems(dictType: string): Promise<{ label: string; value: string | number }[]> {
  return get(`/dict/${dictType}`);
}

/**
 * 获取系统当前时间
 */
export function getServerTime(): Promise<number> {
  return get('/system/time');
}

/**
 * 发送邮箱验证码
 * @param email 邮箱
 */
export function sendSmsCode(email: string): Promise<void> {
  return post('/user/sendCode', { email });
}

/**
 * 通用的资源创建方法
 * @param resource 资源名称
 * @param data 创建数据
 */
export function createResource<T, R>(resource: string, data: T): Promise<R> {
  return post<R>(`/${resource}`, data);
}

/**
 * 通用的资源更新方法
 * @param resource 资源名称
 * @param id 资源ID
 * @param data 更新数据
 */
export function updateResource<T, R>(resource: string, id: string | number, data: T): Promise<R> {
  return put<R>(`/${resource}/${id}`, data);
}

/**
 * 通用的资源删除方法
 * @param resource 资源名称
 * @param id 资源ID
 */
export function deleteResource<R>(resource: string, id: string | number): Promise<R> {
  return del<R>(`/${resource}/${id}`);
}

/**
 * 通用的资源查询方法
 * @param resource 资源名称
 * @param id 资源ID
 */
export function getResource<R>(resource: string, id: string | number): Promise<R> {
  return get<R>(`/${resource}/${id}`);
}

/**
 * 通用的资源列表查询方法
 * @param resource 资源名称
 * @param params 查询参数
 */
export function getResourceList<R, P extends PageParams>(resource: string, params: P): Promise<PageResult<R>> {
  return get<PageResult<R>>(`/${resource}`, params);
}
