import { get, openid } from './base';

const video = {
  fetchVideo(subjectName, pageSize, page) {
    return get(`/video/${openid()}/${subjectName}/${pageSize}/${page}`);
  },
};

export default video;
