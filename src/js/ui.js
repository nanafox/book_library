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
        <button
          class="toggle-status-btn px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border-2 flex items-center gap-1 ${
            book.isRead
              ? "bg-green-100 text-green-800 hover:bg-green-200 border-green-300 hover:border-green-400"
              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-300 hover:border-yellow-400"
          }"
          data-book-id="${book.id}"
          title="Click to ${book.isRead ? "mark as unread" : "mark as read"}"
        >
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            ${
              book.isRead
                ? '<path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>'
                : '<path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>'
            }
          </svg>
          ${book.isRead ? "Read" : "Unread"}
          <svg class="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
          </svg>
        </button>
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
