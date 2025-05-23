/**
 * API响应基础接口
 */
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

/**
 * 分页参数接口
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * 排序参数接口
 */
export interface SortParams {
  sortField?: string;
  sortOrder?: 'ascend' | 'descend' | null;
}

/**
 * 列表响应接口
 */
export interface ListResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * 树形数据节点接口
 */
export interface TreeNode {
  id: string | number;
  label: string;
  value: string | number;
  children?: TreeNode[];
  [key: string]: any;
}

/**
 * 用户信息接口
 */
export interface UserInfo {
  id: number | string;
  username: string;
  nickname?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  roles?: string[];
  permissions?: string[];
  status?: number;
  createTime?: string;
  updateTime?: string;
  [key: string]: any;
}

/**
 * 菜单项接口
 */
export interface MenuItem {
  id: string | number;
  name: string;
  path: string;
  icon?: string;
  parentId?: string | number;
  sort?: number;
  hidden?: boolean;
  children?: MenuItem[];
  meta?: {
    title: string;
    icon?: string;
    keepAlive?: boolean;
    hidden?: boolean;
    [key: string]: any;
  };
  [key: string]: any;
}
