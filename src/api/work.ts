import { get, post } from '../utils/request';

import type { PaginationParams } from './types'

interface GetOC_AU_WorkListParams extends PaginationParams {
  type: 0 | 1 | 2,
  isNsfw: 0 | 1,
}


export function createOC_AU_Work_Api(data: any) {
  return post('/product/creation', data)
}



export function getOC_AU_WorkList_Api(params: GetOC_AU_WorkListParams) {
  return get('/product/creation', params)
}



export function getWorkDetail_Api(id: string) {
  return get(`/product/creation/${id}/detail`)
}

// 评论，点赞, 收藏, 添加二创

export function createWorkCommentApi(id: string, data: any) {
  return post(`/product/creation/${id}/comment`, data)
}

export function getCommentListApi(id: string) {
  return get(`/product/creation/${id}/comments`)
}

export function thumbUpWorkApi(data: any) {
  return post('/product/creation/follower', data)
}

export function addToMyLikeApi(data: any) {
  return post('/product/creation/like', data)
}

// TODO: 添加二创问题
export function addToMyRecreationApi(params: any) {
  return get('/product/add/wait', params)
}

// chain
export function getChainDetailApi(id: string) {
  return get('/product/creation/chainDetail', { creationId: id })
}


// 获取全部分类
export function getCustomGroupsApi(creatorId: string | number) {
  return get('/product/creation/group', {
    pageNum: 1,
    pageSize: 999,
    creatorId,
  })
}

// 创建分类/分组
export function createCustomGroupApi(data: any) {
  return post('/product/creation/group', data)
}

// 创建合集
export function createCollectionApi(data: any) {
  return post('/product/creation/collection', data)
}

export function getCollectionListApi(params: any) {
  return get('/product/creation/collection/page', params)
}

export function getCollectionDetailApi(params: any) {
  return get('/product/creation/collection/detail', params)
}


// 搜索
export function searchApi(params: any) {
  return get('/seek/api/v1/search', params)
}
