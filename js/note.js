/**
 * @file js/note.js
 * @author Yujin Jeong
 * @version 1.0
 * @description This file contains the Note class that represents a note.
 */
class Note {

    /**
     * Constructor for Note class.
     * 
     * @param {*} noteId id for the note. 
     * @param {*} content content for the note.
     */
    constructor(noteId, content = INITIAL_EMPTY_CONTENT) {
        this.noteId  = noteId;
        this.content = content;

        this.noteContainer = null;
        this.txtArea       = null;
        this.removeBtn     = null;
    }

    // Get note ID.
    getNoteId() {
        return this.noteId;
    }

    // Get note content.
    getContent() {
        return this.content;
    }

    // Set note content.
    setContent(content) {
        this.content = content;

        if (this.txtArea) {
            this.txtArea.value = content;
        }
    }

    // Create text area and remove button for the note.
    createNoteWriteElements(notesListContainer) {

        // Container for text area and remove button.
        // dataset.noteId -> Convert noteId to kebab-case for HTML data attribute like 'data-note-id'
        this.noteContainer                = document.createElement(DIV_ELEMENT);
        this.noteContainer.dataset.noteId = this.noteId;
        this.noteContainer.className      = NOTE_CONTAINER_CLASS;

        // Text area for note content.
        this.txtArea          = document.createElement(TXTAREA.ELEMENT);
        this.txtArea.className = TXTAREA.CLASS;
        this.txtArea.name      = TXTAREA.NAME;
        this.txtArea.rows      = TXTAREA.ROWS;
        this.txtArea.cols      = TXTAREA.COLS;
        this.txtArea.value     = this.content;

        // Remove button for the note.
        this.removeBtn             = document.createElement(REMOVE.ELEMENT);
        this.removeBtn.type        = REMOVE.TYPE;
        this.removeBtn.className   = REMOVE.CLASS;
        this.removeBtn.textContent = userMsgs.WRITER_REMOVE_BTN;

        this.noteContainer.appendChild(this.txtArea);
        this.noteContainer.appendChild(this.removeBtn);
        notesListContainer.appendChild(this.noteContainer);

        return this.noteContainer;
    }

    // Remove note elements from the DOM.
    remove() {
        if (this.noteContainer) {
            this.noteContainer.remove();
        }
        this.noteContainer = this.txtArea = this.removeBtn = null;
    }

    // Recreate note object from JSON when retrieving from localStorage.
    static createNoteFromJSON(jsonObj) {
        let noteObj = new Note(jsonObj.id, jsonObj.content);

        return noteObj;
    }
}