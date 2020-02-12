export const UI = {
  latitude: document.getElementById('latitude'),
  longitude: document.getElementById('longitude'),
  btnLoad: document.getElementById('load-from-server'),
  btnClear: document.getElementById('clear-all'),
  summary: document.getElementById('summary'),
  spinner: document.querySelector('.spinner'),
  imageWheather: document.querySelector('.img-weather'),
  displayData: document.querySelector('.display-data'),
  place: document.getElementById('place'),
  temperature: document.getElementById('temperature'),
  humidity: document.getElementById('humidity'),
  pressure: document.getElementById('pressure'),
  windSpeed: document.getElementById('windSpeed'),
  renderUI(data) {
    this.imageWheather.classList.add(data.currently.icon);
    this.place.innerText = data.timezone;
    this.temperature.innerText = data.currently.temperature;
    this.humidity.innerText = data.currently.humidity;
    this.pressure.innerText = data.currently.pressure;
    this.windSpeed.innerText = data.currently.windSpeed;
    this.summary.innerText = data.hourly.summary;
    this.displayData.classList.remove('hide');
  },
  clearUI() {
    this.imageWheather.classList.value = 'img-weather';
    this.summary.innerText = '';
    this.displayData.classList.add('hide');
  },
  restNotWorking: true,
};
