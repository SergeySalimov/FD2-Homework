const buttonBlue = document.getElementById('btn-blue');
const buttonGreen = document.getElementById('btn-green');
const buttonYellow = document.getElementById('btn-yellow');
const timePlace = document.getElementById('current-time');
const datePlace = document.getElementById('current-date');
const inHeader = document.querySelector('.header');

const saveState = (st) => {
  localStorage.setItem('state', st);
};

const state1 = () => {
  saveState(1);
  document.body.style.backgroundImage = 'url("img/ripples.png")';
  inHeader.style.color = '#fcff62';
};

const state2 = () => {
  saveState(2);
  document.body.style.backgroundImage = 'url("img/trees.png")';
  inHeader.style.color = '#7a9ce6';
};

const state3 = () => {
  saveState(3);
  document.body.style.backgroundImage = 'url("img/dot-grid.png")';
  inHeader.style.color = '#e6696c';
};

// eslint-disable-next-line consistent-return
function initState() {
  const variant = +localStorage.getItem('state');
  switch (variant) {
    case 1:
      state1();
      break;
    case 2:
      state2();
      break;
    case 3:
      state3();
      break;
    default:
      return false;
  }
}

initState();

function eventListener() {
  window.setInterval(() => {
    // eslint-disable-next-line no-undef
    moment.locale('ru');
    // eslint-disable-next-line no-undef
    const now = moment().add(1, 'hour');
    datePlace.innerText = now.format('LL');
    timePlace.innerText = now.format('LTS');
  }, 1000);
  // function on click
  buttonBlue.addEventListener('click', () => {
    state1();
  });
  buttonGreen.addEventListener('click', () => {
    state2();
  });
  buttonYellow.addEventListener('click', () => {
    state3();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  eventListener();
});
