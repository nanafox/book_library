import Book from "./book.js";
import { displayBooks } from "./ui.js";
import { showToast } from "./toast.js";
import { showConfirmModal } from "./modal.js";

/**
 * Handles book deletion with confirmation
 * @param {string} bookId - The ID of the book to delete
 */
export async function deleteBook(bookId) {
  try {
    // Find the book first to get its title for confirmation
    const book = Book.findBookById(bookId);

    // Show custom confirmation modal
    const confirmed = await showConfirmModal(
      "Delete Book",
      `Are you sure you want to delete "${book.title}" by ${book.author}? This action cannot be undone.`,
      {
        confirmText: "Delete",
        cancelText: "Cancel",
        confirmClass: "bg-red-500 hover:bg-red-600",
      }
    );

    if (!confirmed) {
      return; // User cancelled
    }

    // Store book details before deletion
    const bookTitle = book.title;

    // Delete the book
    Book.deleteBook(bookId);

    // Refresh the display
    displayBooks();

    // Show success toast
    showToast(
      "Success!",
      `"${bookTitle}" has been removed from your library.`,
      "success"
    );
  } catch (error) {
    console.error("Error deleting book:", error);
    showToast("Error", `Unable to delete book: ${error.message}`, "error");
  }
}

/**
 * Sets up delete button event listeners
 */
export function setupDeleteListeners() {
  const booksContainer = document.getElementById("books-container");

  if (!booksContainer) {
    throw new Error("Books container not found");
  }

  // Use event delegation to handle dynamically created delete buttons
  booksContainer.addEventListener("click", async (event) => {
    if (event.target.closest(".delete-book-btn")) {
      const deleteBtn = event.target.closest(".delete-book-btn");
      const bookId = deleteBtn.getAttribute("data-book-id");

      if (bookId) {
        await deleteBook(bookId);
      }
    }
  });
}
