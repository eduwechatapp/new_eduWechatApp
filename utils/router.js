export function route(_url, param) {
    let urlParam = '';
    if (Object.keys(param).length > 0) {
        urlParam = '?';
        Object.keys(param).forEach((k, i) => {
        if (i > 0) {
            urlParam += '&';
        }
        urlParam += `${k}=${param[k]}`;
        });
    }
    const url = `${_url}${urlParam}`;
    wx.navigateTo({ url });
}
