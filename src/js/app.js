import Control from './control';
import Settings from './settings';
import Notes from './TextNotes';

const control = new Control();
const notes = new Notes();
const settings = new Settings();
notes.loadNotes();
notes.textListner();
control.pickOut();
control.change();
settings.theme();
settings.avatar();
