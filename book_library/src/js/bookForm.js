import Book from "./book.js";
import { displayBooks } from "./ui.js";
import { showToast } from "./toast.js";

/**
 * Handles adding a new book from the form
 * @param {Event} event - The form submit event
 * @param {HTMLElement} form - The form element
 * @param {HTMLElement} dialog - The dialog element
 * @param {HTMLElement} booksContainer - The container to refresh books display
 */
export function addNewBook(event, form, dialog, booksContainer) {
  event.preventDefault();

  try {
    // Get form field values
    const title = document.getElementById('book-title').value.trim();
    const author = document.getElementById('book-author').value.trim();
    const numOfPages = parseInt(document.getElementById('book-pages').value);
    const status = document.getElementById('book-status').value;

    // Convert status to boolean
    const isRead = status === 'read';

    // Create new book using the Book class
    Book.addBook(title, author, isRead, numOfPages);

    // Reset form and close dialog
    form.reset();
    dialog.close();

    // Refresh the books display
    displayBooks(booksContainer);

    // Show success notification
    showToast('Success!', `"${title}" has been added to your library.`, 'success');

  } catch (error) {
    // Show error notification
    showToast('Error', `Unable to add book: ${error.message}`, 'error');
  }
}
