import Book from "./book.js";

/**
 * Creates a book card HTML structure.
 * @param {Object} book - The book object containing details.
 * @returns {string} - The HTML string for the book card.
 */
export function createBookCard(book) {
  return `
    <div id="book-${book.id}" data-book-id="${
    book.id
  }" class="bg-white rounded-lg hover:shadow-lg shadow-md p-6 border border-gray-200 transition-shadow duration-200">
      <h3 class="text-xl font-bold text-gray-800 mb-2">${book.title}</h3>
      <p class="text-gray-600 mb-2">by ${book.author}</p>
      <div class="flex justify-between items-center mb-4">
        <span class="text-sm text-gray-500">${book.numOfPages} pages</span>
        <span class="px-2 py-1 rounded text-xs font-medium ${
          book.isRead
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
        }">
          ${book.isRead ? "Read" : "Unread"}
        </span>
      </div>
      <div class="flex justify-end">
        <button
          class="delete-book-btn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200 flex items-center gap-1"
          data-book-id="${book.id}"
          title="Delete this book"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          Delete
        </button>
      </div>
    </div>
  `;
}

/**
 * Displays a list of books in the books container.
 * @param {Array} books - The array of book objects to display (optional).
 * @returns {void}
 */
export function displayBooks(books) {
  const container = document.getElementById("books-container");

  if (!container) {
    throw new Error("Books container not found");
  }

  if (books === undefined) {
    books = Book.listAllBooks();
  }

  if (!Array.isArray(books)) {
    throw new Error("Books must be an array.");
  }

  if (books.length === 0) {
    container.innerHTML =
      '<p class="text-center text-gray-500 col-span-full">No books in your library yet.</p>';
    return;
  }

  const booksHTML = books.map((book) => createBookCard(book)).join("");
  container.innerHTML = booksHTML;
}
