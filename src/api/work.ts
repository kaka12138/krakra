import { get, post } from '../utils/request';

import type { PaginationParams } from './types'

interface GetOC_AU_WorkListParams extends PaginationParams {
  type: 0 | 1 | 2,
  isNsfw: 0 | 1,
}


export function createOC_AU_Work_Api(data: any) {
  return post('/creation', data)
}

export function createGuashi_Api(data: any) {
  return post('/post', data)
}

export function getOC_AU_WorkList_Api(params: GetOC_AU_WorkListParams) {
  return get('/creation', params)
}

export function getGuashiList_Api(params: GetGuashiListParams) {
  return get('/post', params)
}

export function getHotCardList_Api() {
  return get('/card/hotCards')
}

export function getWorkDetail_Api(id: string) {
  return get(`/creation/${id}/detail`)
}

// 评论，收藏，点赞

export function commentApi(id: string, data: any) {
  return post(`/creation/${id}/comment`, data)
}

export function getCommentListApi(id: string) {
  return get(`/creation/${id}/comments`)
}

export function thumbUpWorkApi( data: any) {
  return post('/creation/like', data)
}

// chain
export function getChainDetailApi(id: string) {
  return get('/creation/chainDetail', { creationId: id })
}
