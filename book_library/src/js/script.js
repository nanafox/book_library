import { displayBooks } from "./ui.js";
import { searchBooks } from "./search.js";
import { initializeToast } from "./toast.js";
import { addNewBook } from "./bookForm.js";

// DOM elements
let booksContainer;
let searchInput;
let addBookButton;
let newBookFormDialog;
let newBookForm;
let toastContainer;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  booksContainer = document.getElementById('books-container');
  searchInput = document.getElementById('search-input');
  addBookButton = document.getElementById("add-book-btn");
  newBookForm = document.getElementById("new-book-form");
  newBookFormDialog = document.getElementById("add-book");
  toastContainer = document.getElementById('toast-container');

  const closeDialogBtn = document.getElementById("close-btn");

  // Initialize modules
  initializeToast(toastContainer);

  // Add event listeners
  searchInput.addEventListener('input', () => {
    searchBooks(searchInput, booksContainer);
  });

  addBookButton.addEventListener("click", () => {
    newBookFormDialog.showModal();
  });

  closeDialogBtn.addEventListener("click", (event) => {
    event.preventDefault();
    newBookForm.reset();
    newBookFormDialog.close();
  });

  // Handle form submission (works for both button click and Enter key)
  newBookForm.addEventListener("submit", (event) => {
    addNewBook(event, newBookForm, newBookFormDialog, booksContainer);
  });

  // Display initial books
  displayBooks(booksContainer);
});
