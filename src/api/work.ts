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
