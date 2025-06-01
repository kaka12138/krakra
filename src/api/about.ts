import { get } from '../utils/request';

export function getMyWork_OC_AU_ListApi(params: any) {
  return get('/creation/getByCreationId', params);
}

export function getMyGuashiListApi(params: any) {
  return get('/post', params);
}
