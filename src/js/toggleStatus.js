import Book from "./book.js";
import { displayBooks } from "./ui.js";
import { showToast } from "./toast.js";

/**
 * Handles toggling the read status of a book
 * @param {string} bookId - The ID of the book to toggle
 */
export async function toggleBookStatus(bookId) {
  try {
    // Find the book first to get its current status
    const book = Book.findBookById(bookId);

    // Toggle the status
    const newStatus = !book.isRead;

    // Update the book's status
    Book.updateReadStatus(bookId, newStatus);

    // Refresh the display
    displayBooks();

    // Show success toast
    const statusAction = newStatus ? "marked as read" : "marked as unread";
    const statusEmoji = newStatus ? "✓" : "○";
    showToast(
      "Status Updated!",
      `${statusEmoji} "${book.title}" ${statusAction}.`,
      "success"
    );
  } catch (error) {
    console.error("Error toggling book status:", error);
    showToast("Error", `Unable to update status: ${error.message}`, "error");
  }
}

/**
 * Sets up status toggle button event listeners
 */
export function setupStatusToggleListeners() {
  const booksContainer = document.getElementById("books-container");

  if (!booksContainer) {
    throw new Error("Books container not found");
  }

  // Use event delegation to handle dynamically created toggle buttons
  booksContainer.addEventListener("click", async (event) => {
    if (event.target.closest(".toggle-status-btn")) {
      const toggleBtn = event.target.closest(".toggle-status-btn");
      const bookId = toggleBtn.getAttribute("data-book-id");

      if (bookId) {
        await toggleBookStatus(bookId);
      }
    }
  });
}
