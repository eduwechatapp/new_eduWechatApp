import { get } from './base';

const secondary = {
  map(subjectEng, typeEng) {
    return get(`/${subjectEng}/${typeEng}/mapping/get`);
  },

  getDataByMap(subjectEng, typeEng, which, pageSize, page) {
    const openid = getApp().open_id;
    return get(`/${subjectEng}/${typeEng}/get/${openid}/${which}/${pageSize}/${page}`);
  },
};

export default secondary; 
