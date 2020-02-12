export const CONFIG = {
  api: 'https://api.darksky.net/forecast/',
  secretKey: '3b17a34ab62c7680a11ccab7d76900da',
  language: 'lang=ru',
  exlude: 'exclude=daily,flags',
  units: 'units=auto',
  corsProxy: 'https://cors-anywhere.herokuapp.com/',
  restNotWorking: true,
  getUrl(latitude, longitude) {
    // eslint-disable-next-line max-len
    return `${this.corsProxy + this.api + this.secretKey}/${latitude},${longitude}?${this.units}&${this.language}`;
  },
};
