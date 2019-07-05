import { get, openid } from './base';

const video = {
  fetchVideo(subject, pageSize, page) {
    return get(`/video/${openid()}/${subject}/${pageSize}/${page}`);
  },
};

export default video;
