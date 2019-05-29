import { post, openid } from './base';

const search = {
  simple(key, pageSize, page) {
    return post(`/search/simple/${openid()}/${key}/${pageSize}/${page}`);
  },

  advance(key, pageSize, page, subjectUnique, mode) {
    return post(`/search/detail/${openid()}/${subjectUnique}/${pageSize}/${page}`, {
      [mode]: key,
    });
  }
};

export default search; 
