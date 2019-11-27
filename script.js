const buttonBlue = document.getElementById('btn-blue');
const buttonGreen = document.getElementById('btn-green');
const buttonYellow = document.getElementById('btn-yellow');
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