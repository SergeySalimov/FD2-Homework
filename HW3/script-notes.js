// eslint-disable-next-line no-unused-vars
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
      const delNotes = objNotes.splice(objNotes.indexOf(delTitle), 1);
      saveData(objNotes);
      return {

        class: 'danger',
        text: 'Tilte was deleted',
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

const UI = {
  btnAddNotes: document.getElementById('add-notes'),
  btnShowNote: document.getElementById('show-note'),
  btnShowAllNotes: document.getElementById('show-all-notes'),
  btnDelNotes: document.getElementById('del-notes'),
  inputTitle: document.getElementById('card-title'),
  inputBody: document.getElementById('card-body'),
  messagePlace: document.getElementById('messages'),
  outputPlace: document.getElementById('output'),

};
