import Book from "./book.js";

// Move these inside DOMContentLoaded or make them functions
let booksContainer;
let searchInput;

/**
 * Creates a book card HTML structure.
 * @param {Object} book - The book object containing details.
 * @returns {string} - The HTML string for the book card.
 */
function createBookCard(book) {
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
 * Searches for books based on the input value and displays the results.
 * @returns {void}
 */
function searchBooks() {
  const searchedValue = searchInput.value.toLowerCase();
  const books = Book.listAllBooks();

  if (searchedValue.trim() === '') {
    displayBooks(); // display all books if search input is empty
    return;
  }

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchedValue) ||
    book.author.toLowerCase().includes(searchedValue)
  );

  if (filteredBooks.length === 0) {
    booksContainer.innerHTML = '<p class="text-center text-gray-500 col-span-full">No books found.</p>';
    return;
  }

  displayBooks(filteredBooks);
}

/**
 * Displays a list of books in the books container.
 * @param {Array} books - The array of book objects to display (optional).
 * @returns {void}
 */
function displayBooks(books) {
  if (books === undefined) {
    books = Book.listAllBooks();
  }

  if (!Array.isArray(books)) {
    throw new Error('Books must be an array.');
  }

  if (books.length === 0) {
    booksContainer.innerHTML = '<p class="text-center text-gray-500 col-span-full">No books in your library yet.</p>';
    return;
  }

  const booksHTML = books.map(book => createBookCard(book)).join('');
  booksContainer.innerHTML = booksHTML;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  booksContainer = document.getElementById('books-container');
  searchInput = document.getElementById('search-input');

  // Add event listener for the search input
  searchInput.addEventListener('input', searchBooks);

  // Display books
  displayBooks();
});