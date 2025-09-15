/**
 * @file js/writer.js
 * @author Yujin Jeong
 * @author Chat GPT & Claude
 * @version 1.0
 * @description This file contains the Writer class that manages notes creation, deletion, auto-saving, and synchronization across tabs.
 */
class Writer {

    /**
     * Constructor for Writer class.
     * 
     * @param {*} notesContainer container for the notes list.
     */
    constructor(notesContainer = WRITER_NOTE_CONTAINER) {
        this.notes           = [];
        this.noteContainer   = document.getElementById(notesContainer);
        this.autoSaveTimerID = null;
        this.lastSavedTime   = null;
        this.nextNoteId      = NEXT_NOTE_ID;
        this.isModified      = false;

        this.init();
    }

    // Mark that notes have been modified.
    setModified() {
        this.isModified = true;
    }

    // Create new Note object and add to array
    addNote(content) {
        const id      = this.nextNoteId++;
        const newNote = new Note(id, content);

        this.notes.push(newNote);
        this.setModified();
    }

    // Remove note from the notes array and DOM and update localStorage.
    removeNoteFromArr(noteId) {
        const noteToRemove = this.notes.find(note => note.getNoteId() === noteId);
        if (noteToRemove) {
            noteToRemove.remove();
        }

        this.notes = this.notes.filter(note => note.getNoteId() !== noteId);
        this.saveToLocalStorage();
    }

    // Convert all notes to JSON and save to localStorage.
    saveToLocalStorage() {
        const notesForStorage = this.notes.map(note => ({ 
            id: note.getNoteId(),
            content: note.getContent()
        }));

        localStorage.setItem(NOTES_KEY, JSON.stringify(notesForStorage));

        // Update last saved time.
        const timeStamp = new Date().toISOString();
        localStorage.setItem(LAST_SAVED_KEY, timeStamp);
        this.lastSavedTime = timeStamp;
        this.updateSaveTime();
    }

    // Load notes from localStorage and recreate Note objects.
    loadFromLocalStorage() {

        this.notes      = [];
        this.nextNoteId = NEXT_NOTE_ID;

        const savedNotesLocal = localStorage.getItem(NOTES_KEY);
        if(!savedNotesLocal) {
            return;
        }

        const parsedNotes = JSON.parse(savedNotesLocal);
        parsedNotes.forEach(JsonObj => {
            const note = Note.createNoteFromJSON(JsonObj);
            this.notes.push(note);
        });

        this.nextNoteId = this.notes.length + NEXT_NOTE_ID;
    }

    // Start auto-saving notes every 2 seconds.
    startAutoSave() {
        this.autoSaveTimerID = setInterval(() => {
            
            if (!this.isModified) {
                return;
            }

            this.saveToLocalStorage();
            this.isModified = false;
        }, INTERVAL);
    }

    // Update the last saved time and display it.
    updateSaveTime() {
        const displayTime = document.getElementById(WRITER_TIME_ID);
        if (!displayTime) {
            return;
        }
        const timeStamp         = this.lastSavedTime || localStorage.getItem(LAST_SAVED_KEY);
        displayTime.textContent = `${STORED_TIME} ${new Date(timeStamp).toLocaleTimeString()}`;
    }

    // Add event listeners for a note's textarea and remove button.
    setupNoteEvents(note) {

        note.txtArea.addEventListener(EVENT_INPUT, (event) => {
            const targetNote = this.notes.find(note1 => note1.getNoteId() === note.getNoteId())
            if (targetNote) {
                targetNote.setContent(event.target.value);
                this.setModified();
            }
        });

        note.removeBtn.addEventListener(EVENT_CLICK, () => {
            this.removeNoteFromArr(note.getNoteId());
        });
    }

    // Render all notes in the notes array to the DOM.
    renderNotesElements() {
        
        this.noteContainer.innerHTML = INITIAL_EMPTY_CONTENT;

        this.notes.forEach(note => {
            note.createNoteWriteElements(this.noteContainer);
            this.setupNoteEvents(note);
        });
    }

    // Reload notes from localStorage and rerender the notes list and last saved time.
    reloadFromStorageAndRerender() {
        this.loadFromLocalStorage();
        this.renderNotesElements();
        this.updateSaveTime();
    }

    // Set up event listeners for adding notes and storage events.
    setupPageEvents() {
        document.getElementById(ELEMENT_IDS.WRITER_ADD_BTN).addEventListener(EVENT_CLICK, () => {
            this.addNote(); 
            this.renderNotesElements();
            this.saveToLocalStorage()
        });
        
        // Listener for storage events to sync notes across tabs.
        window.addEventListener(EVENT_STORAGE, (event) => {
            if (event.key === NOTES_KEY) {
                this.reloadFromStorageAndRerender();
            }
        });
    }
    
    // Initialize the Writer application.
    init() {
        this.loadFromLocalStorage();
        this.renderNotesElements();
        this.setupPageEvents();
        this.startAutoSave();
        this.updateSaveTime();
    }
}

document.addEventListener(EVENT_DOM_CONTENT_LOADED, () => { new Writer(WRITER_NOTE_CONTAINER); });
