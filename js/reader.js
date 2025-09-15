/**
 * @file js/reader.js
 * @author Yujin Jeong
 * @author Chat GPT & Claude
 * @version 1.0
 * @description This file contains the Reader class that represents the note reader.
 */
class Reader {

    /**
     * Constructor to initialize the Reader with default values.
     * 
     * @param {*} notesContainerId container ID for notes display
     * @param {*} timeId container ID for time display
     */
    constructor(notesContainerId = READER_NOTE_CONTAINER, timeId = READER_TIME_ID) {
        this.notes               = [];
        this.lastRetrievedTime   = null;
        this.noteContainer       = document.getElementById(notesContainerId);
        this.time                = document.getElementById(timeId);

        if (this.noteContainer && this.time) {
            this.startAutoRefresh();
        }
    }

    // Clear all notes from the display container.
    clearPage() {
        if (this.noteContainer) {
            this.noteContainer.textContent = INITIAL_EMPTY_CONTENT;
        }
    }
    
    // Create and display note elements on the page.
    createDisplayNotesElements() {
        this.clearPage();

        this.notes.forEach(note => {
            const outerDiv        = document.createElement(DIV_ELEMENT);
            outerDiv.className    = READER_OUTER_DIV_CLASS;
            const innerDiv        = document.createElement(DIV_ELEMENT);
            innerDiv.className    = READER_INNER_DIV_CLASS;
            const paragraph       = document.createElement(P_ELEMENT);
            paragraph.className   = READER_P_CLASS;
            paragraph.textContent = note.getContent();

            innerDiv.appendChild(paragraph);
            outerDiv.appendChild(innerDiv);
            this.noteContainer.appendChild(outerDiv);
        });
    }

    // Load notes from localStorage and recreate Note objects.
    loadFromLocalStorage() {
        this.notes      = [];

        const savedNotes = localStorage.getItem(NOTES_KEY);
        if(!savedNotes) {
            this.lastRetrievedTime = new Date();
            return;
        }

        const parsedNotes = JSON.parse(savedNotes);
        parsedNotes.forEach(JsonObj => {
            const note = Note.createNoteFromJSON(JsonObj);
            this.notes.push(note);
        });

        this.lastRetrievedTime = new Date();
    }

    // Update the last retrieved time and display it.
    updateLastRetrievedTime() {
        if (this.time) {
            const timeStamp = this.lastRetrievedTime || new Date()
            this.time.textContent = `${UPDATED_TIME} ${timeStamp.toLocaleTimeString()}`;
        }
    }

    // Refresh the page by reloading notes and updating the display.
    refreshPage() {
        this.loadFromLocalStorage();
        this.createDisplayNotesElements();
        this.updateLastRetrievedTime();
    }

    // Start auto-refreshing the page every 2 seconds.
    startAutoRefresh() {
        this.refreshPage();
        setInterval(() => this.refreshPage(), INTERVAL);

        window.addEventListener(EVENT_STORAGE, (event) => {
            if (event.key === NOTES_KEY) {
                this.refreshPage();
            }
        });
    }
}

document.addEventListener(EVENT_DOM_CONTENT_LOADED, () => { new Reader(READER_NOTE_CONTAINER, READER_TIME_ID); });
