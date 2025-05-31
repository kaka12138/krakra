import { get } from './request';

export function getMyWork_OC_AU_ListApi(params: any) {
  return get('/creation/getByCreationId', params);
}
