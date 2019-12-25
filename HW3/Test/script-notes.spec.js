describe('script-note.js -> Notes - const initNotes = () => {} -> Should load objNotes from localStrorage',
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

      it('objNotes is in localStorage and should return correct objNotes', function () {
        expect(objNotes).toEqual([]);
        Notes.init();
        expect(objNotes).toEqual([{
          title: '1',
          body: 'notes1',
        }]);
      });
    });


// describe('script-note.js -> Notes.addNotes', function () {
//   it('should add Notes to obj: objNotes if title is unique, if not new note don`t adds', function () {
//     it('should add note with new title', function () {
//
//     });
//
//   });
//
// });