const OBJECT_NAME = 'notes';

describe('script-note.js -> Notes.init(); -> Should use localStrorage and do parsing of object',
    function () {
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

describe('script-note.js -> Notes.addNotes -> Should add notes if title is not repeated',
    function () {
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
      const note4 = {
        wrongTitle: '5',
        body: 'notes2',
      };
      it('should return error: false when added note whith new title // attemp1', function () {
        attemp = Notes.addNotes(note1.title, note1.body);
        expect(attemp.error).toBe(false);
      });
      it('should return error: falsewhen added note whith new title // attemp2', function () {
        attemp = Notes.addNotes(note2.title, note2.body);
        expect(attemp.error).toBe(false);
      });
      it('should return error: true when added note whith no title // attemp3', function () {
        attemp = Notes.addNotes('', '');
        expect(attemp.error).toBe(true);
      });
      it('should return error: true when added note whith same title as was // attemp4', function () {
        Notes.addNotes(note3.title, note3.body);
        attemp = Notes.addNotes(note3.title, note3.body);
        expect(attemp.error).toBe(true);
      });
      it('should return error: true when added note whith wrongTitle field in obj // attemp5', function () {
        Notes.addNotes(note4.title, note4.body);
        attemp = Notes.addNotes(note3.title, note3.body);
        expect(attemp.error).toBe(true);
      });
    });

describe('script-note.js -> Notes.showNote', function () {


});