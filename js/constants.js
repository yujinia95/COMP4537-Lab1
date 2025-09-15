/**
 * Storing constants in a separate file for better maintainability and readability.
 * @author Yujin Jeong
 * @version 1.0
 */
const INITIAL_EMPTY_CONTENT    = "";
const NOTES_KEY                = "COMP4537_Notes";
const LAST_SAVED_KEY           = "COMP4537_LastSaved";
const DIV_ELEMENT              = "div";
const NOTE_CONTAINER_CLASS     = "note-container";
const READER_NOTE_CONTAINER    = "notes-list-reader";
const READER_TIME_ID           = "updated-at";
const P_ELEMENT                = "p";
const READER_OUTER_DIV_CLASS   = "card";
const READER_INNER_DIV_CLASS   = "card-body";
const READER_P_CLASS           = "card-text";
const UPDATED_TIME             = "Updated at:";
const INTERVAL                 = 2000;
const EVENT_STORAGE            = "storage";
const EVENT_DOM_CONTENT_LOADED = "DOMContentLoaded";
const WRITER_NOTE_CONTAINER    = "notes-list";
const NEXT_NOTE_ID             = 1;
const WRITER_TIME_ID           = "last-saved-time";
const STORED_TIME              = "Stored at:";
const EVENT_INPUT              = "input";
const EVENT_CLICK              = "click";
const TXTAREA                  = {
    ELEMENT : "textarea",
    CLASS   : "txt-area",
    NAME    : "note",
    ROWS    : 5,
    COLS    : 33
}
const REMOVE                   = {
    ELEMENT : "button",
    TYPE    : "button",
    CLASS   : "btn btn-outline-danger",
}
const ELEMENT_IDS              = {
        // IDs for index.html.
        INDEX_HTML_TITLE    : "index_html_title",
        INDEX_HTML_H1       : "index_html_h1",
        INDEX_HTML_H2       : "index_html_h2",
        INDEX_TO_WRITER_BTN : "index_to_writer_btn",
        INDEX_TO_READER_BTN : "index_to_reader_btn",

        // IDs for writer.html.
        WRITER_HTML_TITLE    : "writer_html_title",
        WRITER_HTML_H1       : "writer_html_h1",
        WRITER_REMOVE_BTN    : "writer_remove_btn",
        WRITER_ADD_BTN       : "writer_add_btn",

        // IDs for reader.html.
        READER_HTML_TITLE    : "reader_html_title",
        READER_HTML_H1       : "reader_html_h1",

        // ID for common button.
        BACK_BUTTON          : "back_button"
    }