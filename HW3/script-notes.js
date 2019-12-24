const Notes = ((function () {
  const OBJECT_NAME = 'notes';
  const OBJECT_UNDEFINED = {
    error: true,
    class: 'warning',
    text: 'Object Notes is undefined. Use Notes.init();',
  };
  const OBJECT_NO_DATA = {
    error: true,
    class: 'warning',
    text: 'Object Notes is empty. Use Notes.addNotes();',
  };
  const OBJECT_NO_TITLE = {
    error: true,
    class: 'warning',
    text: 'Title of note is empty or no valid',
  };
  let objNotes;

  const initNotes = () => {
    if (localStorage.getItem(OBJECT_NAME)) {
      objNotes = JSON.parse(localStorage.getItem(OBJECT_NAME));
      return {
        error: false,
        class: 'success',
        text: 'Loaded notes from localStorage',
      };
    }
    objNotes = [];
    return {
      error: true,
      class: 'info',
      text: 'No saved data in localStorage',
    };
  }

  const saveData = (obj) => {
    const data = [...obj];
    localStorage.setItem(OBJECT_NAME, JSON.stringify(data));
  };

  const titleInObject = (newTitle) => {
    if (objNotes === undefined) return OBJECT_UNDEFINED;
    if (objNotes.length === 0) return OBJECT_NO_DATA;
    if (newTitle) {
      for (const item of objNotes) if (item.title === newTitle) return {
        error: false,
        class: 'success',
        text: 'Title is in object',
        title: item.title,
        body: item.body,
      };
    }
    return {
      error: true,
      class: 'warning',
      text: 'I have no notes with this title',
    };
  };

  const addNoteToObject = (addTitle, addBody) => {
    if (objNotes === undefined) return OBJECT_UNDEFINED;
    if (!addTitle) return OBJECT_NO_TITLE;
    for (const item of objNotes) if (item.title === addTitle) return {
      error: true,
      class: 'warning',
      text: 'Title wasn`t unique! Please change title',
    };
    const newNotes = {
      title: addTitle,
      body: addBody,
    };
    objNotes.push(newNotes);
    saveData(objNotes);
    return {
      error: false,
      class: 'success',
      text: 'Note added. Thank you',
    };
  };

  const showAllTitlesOfObject = () => {
    if (objNotes === undefined) return OBJECT_UNDEFINED;
    if (objNotes.length === 0) return OBJECT_NO_DATA;
    const arrNewTitles = [];
    for (const item of objNotes) arrNewTitles.push(item.title);
    return {
      error: false,
      class: 'success',
      text: 'Return array of all titles',
      arr: arrNewTitles,
    };
  };

  const delNoteByTitleFromObject = (delTitle) => {
    if (objNotes === undefined) return OBJECT_UNDEFINED;
    if (objNotes.length === 0) return OBJECT_NO_DATA;
    for (const item of objNotes) if (item.title === delTitle) {
      const delNotes = objNotes.splice(objNotes.indexOf(item), 1);
      saveData(objNotes);
      return {
        class: 'danger',
        text: 'Note was deleted',
        ...delNotes,
      };
    }
    return {
      class: 'warning',
      text: 'I have no notes with this title',
    };
  };

  return {
    init() {
      return initNotes();
    },
    addNotes(title, body = '') {
      return addNoteToObject(title, body);
    },
    showNote(title) {
      return titleInObject(title);
    },
    showAll() {
      return showAllTitlesOfObject();
    },
    delNote(title) {
      return delNoteByTitleFromObject(title);
    },
  };
})());

const Messages = ((function () {
  const arrOfMessages = [];

  const pushMessageToObj = (obj) => {
    const newObj = {
      class: obj.class,
      text: obj.text,
    };
    arrOfMessages.push(newObj);
    return true;
  };
  // return last 5 messages
  const getMessagesFromArrOfMessages = () => arrOfMessages.slice(-5);

  return {
    push(obj) {
      return pushMessageToObj(obj);
    },
    get() {
      return getMessagesFromArrOfMessages();
    },
  };
})());

const UI = {
  btnAddNotes: document.getElementById('add-notes'),
  btnShowNote: document.getElementById('show-note'),
  btnShowAllNotes: document.getElementById('show-all-notes'),
  btnDelNotes: document.getElementById('del-notes'),
  inputTitle: document.getElementById('card-title'),
  inputBody: document.getElementById('card-body'),
  messagePlace: document.getElementById('messages'),
  outputPlace: document.getElementById('output'),
  showMessage() {
    this.clearMessage();
    const stackOfMsg = Messages.get();
    stackOfMsg.forEach((obj) => {
      const spanMsg = document.createElement('span');
      spanMsg.className = obj.class;
      spanMsg.innerHTML = obj.text;
      this.messagePlace.appendChild(spanMsg);
    });
  },
  clearMessage() {
    this.messagePlace.innerText = '';
  },
  initialization() {
    Messages.push(Notes.init());
    UI.showMessage();
  },
  clearUI() {
    this.inputTitle.value = '';
    this.inputBody.value = '';
  },
  clearNotes() {
    this.outputPlace.innerText = '';
  },
  createNoteHTML(obj, full = true) {
    const newNote = document.createElement('li');
    const newNoteTitle = document.createElement('span');
    newNoteTitle.innerHTML = obj.title;
    const newNoteBody = document.createElement('pre');
    newNoteBody.innerHTML = obj.body;
    newNote.appendChild(newNoteTitle);
    if (full) newNote.appendChild(newNoteBody);
    return newNote;
  },
  showNoteOnDisplay(obj, full = true) {
    const noteToDisp = {
      title: obj.title,
      body: obj.body,
    };
    this.outputPlace.append(this.createNoteHTML(noteToDisp, full));
  },
  renderArrOfTitles(arr) {
    arr.forEach((titleToDisplay) => {
      const objTemp = { title: titleToDisplay };
      this.showNoteOnDisplay(objTemp, false);
    });
  },
  displayMessage(obj) {
    Messages.push(obj);
    this.showMessage();
  },
};

UI.initialization();

UI.btnAddNotes.addEventListener('click', (event) => {
  event.preventDefault();
  UI.clearNotes();
  const newNote = Notes.addNotes(UI.inputTitle.value, UI.inputBody.value);
  UI.displayMessage(newNote);
  if (!newNote.error) UI.clearUI();
});

UI.btnShowNote.addEventListener('click', (event) => {
  event.preventDefault();
  const shwNote = Notes.showNote(UI.inputTitle.value);
  UI.displayMessage(shwNote);
  UI.clearUI();
  if (!shwNote.error) {
    UI.clearNotes();
    UI.showNoteOnDisplay(shwNote);
  }
});

UI.btnShowAllNotes.addEventListener('click', (event) => {
  event.preventDefault();
  const shwAll = Notes.showAll();
  UI.displayMessage(shwAll);
  UI.clearNotes();
  UI.renderArrOfTitles(shwAll.arr);
});

UI.btnDelNotes.addEventListener('click', (event) => {
  event.preventDefault();
  UI.clearNotes();
  const delNote = Notes.delNote(UI.inputTitle.value);
  UI.displayMessage(delNote);
  if (!delNote.error) UI.clearUI();
});
