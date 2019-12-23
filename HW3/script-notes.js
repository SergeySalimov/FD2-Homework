// eslint-disable-next-line no-unused-vars
const Notes = ((function () {
  const OBJECT_NAME = 'notes';
  // eslint-disable-next-line max-len
  let objNotes = [{title: '1', body: 'notes1'}, {title: '2', body: 'notes2'}];

  function initNotes() {
    if (localStorage.getItem(OBJECT_NAME)) {
      objNotes = JSON.parse(localStorage.getItem(OBJECT_NAME));
      return {
        class: 'success',
        text: 'Loaded data from localStorage',
      };
    }
    return {
      class: 'warning',
      text: 'No data in localStorage',
    };
  }

  initNotes();

  const saveData = (obj) => {
    const data = [...obj];
    localStorage.setItem(OBJECT_NAME, JSON.stringify(data));
  };

  const titleInObject = (newTitle) => {
    if (newTitle) {
      for (const item of objNotes) if (item.title === newTitle) return {
        class: 'success',
        text: 'Title is in object',
        title: item.title,
        body: item.body,
      };
    }
    return {
      class: 'warning',
      text: 'I have no notes with this title',
    };
  };

  const addNoteToObject = (addTitle, addBody) => {
    for (const item of objNotes) if (item.title === addTitle) return {
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
      class: 'success',
      text: 'Note added. Thank you',
    };
  };

  const showAllTitlesOfObject = () => {
    const arrNewTitles = [];
    for (const item of objNotes) arrNewTitles.push(item.title);
    return {
      class: 'success',
      text: 'Return array of all titles',
      arr: arrNewTitles,
    };
  };

  const delNoteByTitleFromObject = (delTitle) => {
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
