import { get, openid } from './base';

const notelist = {
  fetchContent(subject, title) {
    return get(`/usual/common/erji-title/${openid()}/${subject}/${title}`);
  },
};

export default notelist;
