// ui interface
const formAddNotes = document.getElementById('addNoteForm');
const formShowNote = document.getElementById('showNoteForm');
const showAllNotes = document.getElementById('show-all-notes-tab');
const formDelNote = document.getElementById('delNoteForm');
// eslint-disable-next-line max-len
const objNotes = [{ title: '1', body: 'notes1' }, { title: '2', body: 'notes2' }];
let currentCard = {};
let flagCardShow = false;
const placeToShowAllNotes = document.getElementById('showAllNotesHere');

function removeElement(el, timeout = 2500) {
  setTimeout(() => {
    el.remove();
  }, timeout);
}

// type: success, danger, warning, info
// eslint-disable-next-line max-len
function showMsg(txt = 'Note was saved. Thank you!', type = 'success', form = formAddNotes) {
  const element = document.createElement('div');
  element.innerHTML = txt;
  element.className = `alert alert-${type} my-2`;
  form.append(element);
  removeElement(element);
}

function isTitleInObject(newTitle) {
// думаю можно тут записать одной строкой не знаю как, или все таки нет?
  // eslint-disable-next-line no-restricted-syntax
  for (const item of objNotes) if (item.title === newTitle) return true;
  return false;
}

// eslint-disable-next-line no-unused-vars
function createCardInfo(titleToCreate, key = 'title') {
  // eslint-disable-next-line no-restricted-syntax
  for (const data of objNotes) {
    if (data.title === titleToCreate) {
      return data[key];
    }
  }
  return false;
}

function createCardStructure(titleToCreate, full = true) {
  const cardTitle = document.createElement('h5');
  cardTitle.innerHTML = createCardInfo(titleToCreate);
  cardTitle.className = 'card-title';
  const cardText = document.createElement('pre');
  cardText.innerHTML = createCardInfo(titleToCreate, 'body');
  cardText.className = 'card-text';
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  const card = document.createElement('div');
  card.className = 'card mx-1 my-1';
  cardBody.appendChild(cardTitle);
  if (full) cardBody.appendChild(cardText);
  card.appendChild(cardBody);
  return card;
}

function saveDataToStorage() {
  // eslint-disable-next-line no-restricted-syntax
  for (const item of objNotes) {
    sessionStorage.setItem(item.title, item.body);
  }
}

formAddNotes.addEventListener('submit', (clcAddNote) => {
  const userInput = {};
  userInput.title = formAddNotes[0].value;
  userInput.body = formAddNotes[1].value;
  if (!isTitleInObject(userInput.title)) {
    showMsg();
    objNotes.push(userInput);
    formAddNotes.reset();
  } else {
    showMsg('Title wasn`t unique! Please change title.', 'warning');
  }
  clcAddNote.preventDefault();
});

formShowNote.addEventListener('submit', (clcShowNote) => {
  const userInputTitle = formShowNote[0].value;
  if (isTitleInObject(userInputTitle)) {
    if (flagCardShow) removeElement(currentCard, 0);
    currentCard = createCardStructure(userInputTitle);
    formShowNote.append(currentCard);
    formShowNote.reset();
    flagCardShow = true;
  } else {
    // eslint-disable-next-line max-len
    showMsg('I have no notes with this title! Please enter correct title.', 'warning', formShowNote);
  }
  clcShowNote.preventDefault();
});

showAllNotes.addEventListener('click', () => {
  while (placeToShowAllNotes.firstChild) {
    placeToShowAllNotes.removeChild(placeToShowAllNotes.firstChild);
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const item of objNotes) {
    const responsiveDiv = document.createElement('div');
    responsiveDiv.className = 'col-sm-6 col-md-4 col-lg-3';
    responsiveDiv.appendChild(createCardStructure(item.title, false));
    placeToShowAllNotes.append(responsiveDiv);
  }
});

formDelNote.addEventListener('submit', (clcDelNote) => {
  const userInputTitle = formDelNote[0].value;
  if (isTitleInObject(userInputTitle)) {
    // eslint-disable-next-line max-len,no-restricted-syntax
    for (const item of objNotes) if (item.title === userInputTitle) objNotes.splice(objNotes.indexOf(item), 1);
    // eslint-disable-next-line max-len
    showMsg(`Note with title '${userInputTitle}' was DELETED!`, 'danger', formDelNote);
    formDelNote.reset();
  } else {
    // eslint-disable-next-line max-len
    showMsg('I have no notes with this title! Can`t delete', 'info', formDelNote);
  }

  clcDelNote.preventDefault();
});

saveDataToStorage();
