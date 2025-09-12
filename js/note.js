/**
 * @file js/note.js
 * @author Yujin Jeong
 * @version 1.0
 * @description This file contains the Note class that represents a note.
 */
class Note {

    static INITIAL_EMPTY_CONTENT = "";

    /**
     * Constructor for Note class.
     * 
     * @param {*} noteID id for the note. 
     * @param {*} content content for the note.
     */
    constructor(noteID, content) {
        this.noteID  = noteID;
        this.content = Note.INITIAL_EMPTY_CONTENT
    }

    // Get note ID.
    getNoteId() {
        return this.noteID;
    }

    // Get note content.
    getContent() {
        return this.content;
    }

    // Set note content.
    setContent(content) {
        this.content = content;
    }
}