import { get } from '../utils/request';

export function getHotCardListApi() {
  return get('/card/hotCards')
}
