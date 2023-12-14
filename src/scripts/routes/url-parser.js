const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    const splitedUrl = this._urlSplitter(url);
    return this._urlCombiner(splitedUrl);
  },

  parseActiveUrlWithoutCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    return this._urlSplitter(url);
  },

  _urlSplitter(url) {
    const [path, queryString] = url.split('?');
    const urlsSplits = path.split('/');

    const queryParams = {};
    if (queryString) {
      const pairs = queryString.split('&');
      pairs.forEach((pair) => {
        const [key, value] = pair.split('=');
        queryParams[key] = value;
      });
    }

    return {
      resource: urlsSplits[1] || null,
      id: urlsSplits[2] || null,
      verb: urlsSplits[3] || null,
      queryParams,
    };
  },

  _urlCombiner(splitedUrl) {
    return (
      (splitedUrl.resource ? `/${splitedUrl.resource}` : '/')
      + (splitedUrl.id ? '/:id' : '')
      + (splitedUrl.verb ? `/${splitedUrl.verb}` : '')
    );
  },
};

export default UrlParser;
