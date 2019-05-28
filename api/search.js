import { post, get } from './base';

const search = {
  simple(key, pageSize, page) {
    const open_id = getApp().open_id;
    return post(`/search/simple/${open_id}/${key}/${pageSize}/${page}`);
  },

  advance(key, pageSize, page, subjectUnique, mode) {
    const open_id = getApp().open_id;
    return post(`/search/detail/${open_id}/${subjectUnique}/${pageSize}/${page}`, {
      [mode]: key,
    });
  }
};

export default search; 
