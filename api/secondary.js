import { get, openid } from './base';

const secondary = {
  map(subjectEng, typeEng) {
    return get(`/${subjectEng}/${typeEng}/mapping/get`);
  },

  getDataByMap(subjectEng, typeEng, which, pageSize, page) {
    return get(`/${subjectEng}/${typeEng}/get/${openid()}/${which}/${pageSize}/${page}`);
  },
};

export default secondary; 
