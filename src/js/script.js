import { displayBooks } from "./ui.js";
import { searchBooks } from "./search.js";
import { initializeToast } from "./toast.js";
import { addNewBook } from "./bookForm.js";
import { setupDeleteListeners } from "./deleteBook.js";
import { initializeModal } from "./modal.js";
import { setupStatusToggleListeners } from "./toggleStatus.js";

// DOM elements
let searchInput;
let addBookButton;
let newBookFormDialog;
let newBookForm;
let toastContainer;

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements
  searchInput = document.getElementById("search-input");
  addBookButton = document.getElementById("add-book-btn");
  newBookForm = document.getElementById("new-book-form");
  newBookFormDialog = document.getElementById("add-book");
  toastContainer = document.getElementById("toast-container");

  const closeDialogBtn = document.getElementById("close-btn");

  // Initialize modules
  initializeToast(toastContainer);
  initializeModal(); // Initialize custom modal system
  setupDeleteListeners(); // Initialize delete functionality
  setupStatusToggleListeners(); // Initialize status toggle functionality

  // Add event listeners
  searchInput.addEventListener("input", () => {
    searchBooks(searchInput);
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
    addNewBook(event, newBookForm, newBookFormDialog);
  });

  // Display initial books
  displayBooks();
});
