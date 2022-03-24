import Control from './control';
import Notes from './TextNotes';

const control = new Control();
const notes = new Notes();
notes.loadNotes();
notes.textListner();
control.pickOut();
control.change();
