const Notes = ((function () {
  const OBJECT_NAME = 'notes';

  let objNotes = [];

  const MSG = {
    objUndefined: {
      error: true,
      class: 'warning',
      text: 'Object Notes is undefined. Use Notes.init();',
    },
    objHaveNoData: {
      error: true,
      class: 'warning',
      text: 'Object Notes is empty. Use Notes.addNotes();',
    },
    objHaveNoTitle: {
      error: true,
      class: 'warning',
      text: 'Title of note is empty or no valid',
    },
    objLoadedFromLocalStorage: {
      error: false,
      class: 'success',
      text: 'Loaded notes from localStorage',
    },
    noDataInLocalStorage: {
      error: true,
      class: 'info',
      text: 'No saved data in localStorage',
    },
    objHaveNoteWithSameTitle: {
      error: true,
      class: 'warning',
      text: 'Title wasn`t unique! Please change title',
    },
    noteAdded: {
      error: false,
      class: 'success',
      text: 'Note added. Thank you',
    },
    objHaveNotewithThisTitle: {
      error: false,
      class: 'info',
      text: 'Returned note with requered title',
    },
    objHaveNoNotewithThisTitle: {
      error: true,
      class: 'warning',
      text: 'I have no notes with this title',
    },
    objHaveNoValidTitle: {
      error: true,
      class: 'warning',
      text: 'Enter valid title',
    },
    allTitleHasShowed: {
      error: false,
      class: 'info',
      text: 'Return array of all titles',
    },
    delNoteDone: {
      error: false,
      class: 'danger',
      text: 'Note was deleted',
    },
    delCanNotBeenNoSuchTitle: {
      error: true,
      class: 'warning',
      text: 'I have no notes with this title',
    },
  };

  const initNotes = () => {
    if (localStorage.getItem(OBJECT_NAME)) {
      objNotes = JSON.parse(localStorage.getItem(OBJECT_NAME));
      return MSG.objLoadedFromLocalStorage;
    }
    objNotes = [];
    return MSG.noDataInLocalStorage;
  };

  const saveData = (obj) => {
    const data = [...obj];
    localStorage.setItem(OBJECT_NAME, JSON.stringify(data));
  };

  const addNoteToObject = (addTitle, addBody) => {
    if (objNotes === undefined) return MSG.objUndefined;
    if (!addTitle) return MSG.objHaveNoTitle;
    // eslint-disable-next-line max-len,no-restricted-syntax
    for (const item of objNotes) if (item.title === addTitle) return MSG.objHaveNoteWithSameTitle;
    const newNotes = {
      title: addTitle,
      body: addBody,
    };
    objNotes.push(newNotes);
    saveData(objNotes);
    return MSG.noteAdded;
  };

  const showNoteByTitle = (newTitle) => {
    if (objNotes === undefined) return MSG.objUndefined;
    if (objNotes.length === 0) return MSG.objHaveNoData;
    if (!newTitle) return MSG.objHaveNoValidTitle;
    // eslint-disable-next-line no-restricted-syntax
    for (const item of objNotes) {
      if (item.title === newTitle) {
        const newNote = {
          title: item.title,
          body: item.body,
        };
        return Object.assign(MSG.objHaveNotewithThisTitle, newNote);
      }
    }
    return MSG.objHaveNoNotewithThisTitle;
  };

  const showAllTitlesOfObject = () => {
    if (objNotes === undefined) return MSG.objUndefined;
    if (objNotes.length === 0) return MSG.objHaveNoData;
    const arrNewTitles = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const item of objNotes) arrNewTitles.push(item.title);
    return {
      arr: arrNewTitles,
      ...MSG.allTitleHasShowed,
    };
  };

  const delNoteByTitleFromObject = (delTitle) => {
    if (objNotes === undefined) return MSG.objUndefined;
    if (objNotes.length === 0) return MSG.objHaveNoData;
    // eslint-disable-next-line no-restricted-syntax
    for (const item of objNotes) {
      if (item.title === delTitle) {
        const delNotes = objNotes.splice(objNotes.indexOf(item), 1);
        saveData(objNotes);
        return {
          ...MSG.delNoteDone,
          ...delNotes,
        };
      }
    }
    return MSG.delCanNotBeenNoSuchTitle;
  };

  return {
    init() {
      return initNotes();
    },
    addNotes(title, body = '') {
      return addNoteToObject(title, body);
    },
    showNote(title) {
      return showNoteByTitle(title);
    },
    showAll() {
      return showAllTitlesOfObject();
    },
    delNote(title) {
      return delNoteByTitleFromObject(title);
    },
  };
})());
