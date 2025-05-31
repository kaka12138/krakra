import { get, post } from '../utils/request';

import type { PaginationParams } from './types'

interface GetOC_AU_WorkListParams extends PaginationParams {
  type: 0 | 1 | 2,
  isNsfw: 0 | 1,
}


export function createOC_AU_Work_Api(data: any) {
  return post('/creation', data)
}



export function getOC_AU_WorkList_Api(params: GetOC_AU_WorkListParams) {
  return get('/creation', params)
}



export function getWorkDetail_Api(id: string) {
  return get(`/creation/${id}/detail`)
}

// 评论，收藏，点赞

export function createWorkCommentApi(id: string, data: any) {
  return post(`/creation/${id}/comment`, data)
}

export function getCommentListApi(id: string) {
  return get(`/creation/${id}/comments`)
}

export function thumbUpWorkApi(data: any) {
  return post('/creation/follower', data)
}

// chain
export function getChainDetailApi(id: string) {
  return get('/creation/chainDetail', { creationId: id })
}


// 获取全部分类
export function getCustomGroupsApi(creatorId: string | number) {
  return get('/creation/group', {
    pageNum: 1,
    pageSize: 999,
    creatorId,
  })
}

// 创建分类/分组
export function createCustomGroupApi(data: any) {
  return post('/creation/group', data)
}
