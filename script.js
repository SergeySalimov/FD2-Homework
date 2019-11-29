const buttonBlue = document.querySelector('.btn-blue');
const buttonGreen = document.querySelector('.btn-green');
const buttonYellow = document.querySelector('.btn-yellow');
const inHeader = document.querySelector('.header');


// function on click
buttonBlue.addEventListener('click', ()=> {
  document.body.style.backgroundImage = 'url("img/ripples.png")';
  inHeader.style.color = '#fcff62';
});
buttonGreen.addEventListener('click', ()=> {
  document.body.style.backgroundImage = 'url("img/trees.png")';
  inHeader.style.color = '#7a9ce6';
});
buttonYellow.addEventListener('click', ()=> {
  document.body.style.backgroundImage = 'url("img/dot-grid.png")';
  inHeader.style.color = '#e6696c';
});