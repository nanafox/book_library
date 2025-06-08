import Book from "./book.js";

/**
 * Creates a book card HTML structure.
 * @param {Object} book - The book object containing details.
 * @returns {string} - The HTML string for the book card.
 */
export function createBookCard(book) {
  return `
    <div id="${book.id}" class="bg-white rounded-lg hover:shadow-lg shadow-md p-6 border border-gray-200">
      <h3 class="text-xl font-bold text-gray-800 mb-2">${book.title}</h3>
      <p class="text-gray-600 mb-2">by ${book.author}</p>
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm text-gray-500">${book.numOfPages} pages</span>
        <span class="px-2 py-1 rounded text-xs font-medium ${book.isRead
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800'
    }">
          ${book.isRead ? 'Read' : 'Unread'}
        </span>
      </div>
    </div>
  `;
}

/**
 * Displays a list of books in the books container.
 * @param {HTMLElement} container - The container element to render books in.
 * @param {Array} books - The array of book objects to display (optional).
 * @returns {void}
 */
export function displayBooks(container, books) {
  if (books === undefined) {
    books = Book.listAllBooks();
  }

  if (!Array.isArray(books)) {
    throw new Error('Books must be an array.');
  }

  if (books.length === 0) {
    container.innerHTML = '<p class="text-center text-gray-500 col-span-full">No books in your library yet.</p>';
    return;
  }

  const booksHTML = books.map(book => createBookCard(book)).join('');
  container.innerHTML = booksHTML;
}
