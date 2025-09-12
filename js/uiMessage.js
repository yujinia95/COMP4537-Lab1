/**
 * @file js/ui-message.js
 * @author Yujin Jeong
 * @version 1.0
 * @description This file contains the UImessage class that manages the messages for the user interface (used for HTML file).
 */

class UImessage {

    static elementIds = {
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
        BACK_BUTTON          : "back_button",
    }


    /**
     * Constructor for UImessage class.
     * 
     * @param {*} index_html_title    title for index.html.
     * @param {*} index_html_h1       h1 for index.html.
     * @param {*} index_html_h2       h2 for index.html.
     * @param {*} index_to_writer_btn button for navigating to writer.html.
     * @param {*} index_to_reader_btn button for navigating to reader.html.
     * @param {*} writer_html_title   title for writer.html.
     * @param {*} writer_html_h1      h1 for writer.html.
     * @param {*} writer_remove_btn   button for removing notes.
     * @param {*} writer_add_btn      button for adding notes.
     * @param {*} reader_html_title   title for reader.html.
     * @param {*} reader_html_h1      h1 for reader.html.
     * @param {*} back_button            button for going back to index.html.
     */
    constructor(
        index_html_title    = UImessage.elementIds.INDEX_HTML_TITLE,
        index_html_h1       = UImessage.elementIds.INDEX_HTML_H1,
        index_html_h2       = UImessage.elementIds.INDEX_HTML_H2,
        index_to_writer_btn = UImessage.elementIds.INDEX_TO_WRITER_BTN,
        index_to_reader_btn = UImessage.elementIds.INDEX_TO_READER_BTN,
        writer_html_title   = UImessage.elementIds.WRITER_HTML_TITLE,
        writer_html_h1      = UImessage.elementIds.WRITER_HTML_H1,
        writer_remove_btn   = UImessage.elementIds.WRITER_REMOVE_BTN,
        writer_add_btn      = UImessage.elementIds.WRITER_ADD_BTN,
        reader_html_title   = UImessage.elementIds.READER_HTML_TITLE,
        reader_html_h1      = UImessage.elementIds.READER_HTML_H1,
        back_button         = UImessage.elementIds.BACK_BUTTON,
    ) {
        this.index_html_title    = document.getElementById(index_html_title);
        this.index_html_h1       = document.getElementById(index_html_h1);
        this.index_html_h2       = document.getElementById(index_html_h2);
        this.index_to_writer_btn = document.getElementById(index_to_writer_btn);
        this.index_to_reader_btn = document.getElementById(index_to_reader_btn);
        this.writer_html_title   = document.getElementById(writer_html_title);
        this.writer_html_h1      = document.getElementById(writer_html_h1);
        this.writer_remove_btn   = document.getElementById(writer_remove_btn);
        this.writer_add_btn      = document.getElementById(writer_add_btn);
        this.reader_html_title   = document.getElementById(reader_html_title);
        this.reader_html_h1      = document.getElementById(reader_html_h1);
        this.back_button         = document.getElementById(back_button);

        this.setTexts(userMsgs);
    }

    setTexts(userMsgs = {}) {
        for (const key of Object.keys(UImessage.elementIds)) {
            const element = this[key.toLowerCase()];

            if (element && userMsgs[key]) {
                element.textContent = userMsgs[key];
            }
        }
    }
}

//! Might need to delete it
window.addEventListener('DOMContentLoaded', () => { new UImessage(userMsgs); });