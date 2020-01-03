const OBJECT_NAME = 'notes';
let attemp;
function clearLocalStorage() {
  localStorage.setItem(OBJECT_NAME, '[]');
  Notes.init();
}
function add3NotesToLocalStorage() {
  localStorage.setItem(OBJECT_NAME, '[{"title":"1","body":"notes1"},{"title":"2","body":"notes2"},{"title":"3","body":"notes3"}]');
  Notes.init();
}
describe('script-note.js -> Notes.init(); -> Should use localStrorage and do parsing of object', function () {
      let objNotes = [];
      beforeEach(function () {
        const fakeObjNotes = JSON.stringify([{
          title: '1',
          body: 'notes1',
        }]);
        spyOn(localStorage, 'getItem').and.callFake(function () {
          objNotes = JSON.parse(fakeObjNotes);
        });
      });

      it('objNotes is getting by localStorage.getItem(); and should parse and return in correct forme', function () {
        expect(objNotes).toEqual([]);
        Notes.init();
        expect(objNotes).toEqual([{
          title: '1',
          body: 'notes1',
        }]);
      });
    });

describe('script-note.js -> Notes.addNotes -> Should add notes if title is not repeated', function () {
      beforeEach(function () {
        clearLocalStorage();
      });

      const note1 = {
        title: '1',
        body: 'notes1',
      };
      const note2 = {
        title: '10',
        body: 'notes10',
      };
      const note3 = {
        title: '2',
        body: 'notes2',
      };
      it('should return error: false when added note whith new title // 1', function () {
        attemp = Notes.addNotes(note1.title, note1.body);
        expect(attemp.error).toBe(false);
      });
      it('should return error: falsewhen added note whith new title // 2', function () {
        attemp = Notes.addNotes(note2.title, note2.body);
        expect(attemp.error).toBe(false);
      });
      it('should return error: true when added note whith no title // 3', function () {
        attemp = Notes.addNotes('', '');
        expect(attemp.error).toBe(true);
      });
      it('should return error: true when added note whith same title as was // 4', function () {
        Notes.addNotes(note3.title, note3.body);
        attemp = Notes.addNotes(note3.title, note3.body);
        expect(attemp.error).toBe(true);
      });
    });

describe('script-note.js -> Notes.showNote', function () {
  beforeEach(function () {
    add3NotesToLocalStorage();
  });

  it('should return error: true when try to show note with different title // 1', function () {
    attemp = Notes.showNote('11');
    expect(attemp.error).toBe(true);
  });
  it('should return error: false when try to show note with same title // 2', function () {
    attemp = Notes.showNote('1');
    expect(attemp.error).toBe(false);
  });
  it('should return error: false when try to show note with same title // 3', function () {
    attemp = Notes.showNote('2');
    expect(attemp.error).toBe(false);
  });
  it('should return error: false when try to show note with same title // 4', function () {
    attemp = Notes.showNote('3');
    expect(attemp.error).toBe(false);
  });
  it('should return error: true when try to show note with no title //5', function () {
    attemp = Notes.showNote('');
    expect(attemp.error).toBe(true);
  });
});

describe('script-note.js -> Notes.showAll', function () {
  it('should return error: true && arr is undefined when try to show all notes on empty objNotes // 1', function () {
    clearLocalStorage();
    attemp = Notes.showAll();
    expect(attemp.error).toBe(true);
    expect(attemp.arr).toBeUndefined();
  });
  it('should return error: false && arr.lenght > 0 when try to show all notes with objNotes with 3 Notes // 2', function () {
    add3NotesToLocalStorage();
    attemp = Notes.showAll();
    expect(attemp.error).toBe(false);
    expect(attemp.arr.length).toBeGreaterThan(0);
  });
});

describe('script-note.js -> Notes.delNote', function () {
  it('should return error: true when try to del notes in empty objNotes // 1', function () {
    clearLocalStorage();
    attemp = Notes.delNote('1');
    expect(attemp.error).toBe(true);
  });
  it('should return error: false when try to del existing note // 2', function () {
    add3NotesToLocalStorage();
    attemp = Notes.delNote('1');
    expect(attemp.error).toBe(false);
  });
  it('should return error: true when try to del deleted note // 2', function () {
    add3NotesToLocalStorage();
    Notes.delNote('1');
    attemp = Notes.delNote('1');
    expect(attemp.error).toBe(true);
  });
  it('should delete Note from localStorage', function () {
    add3NotesToLocalStorage();
    let titleToDelete = '2';
    Notes.delNote(titleToDelete);
    findFlag = false;
    const notesFromStorage = JSON.parse(localStorage.getItem(OBJECT_NAME));
    for (const item of notesFromStorage) if (item.title === titleToDelete) findFlag = true;
    expect(findFlag).toBe(false);
  });
});
