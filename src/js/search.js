import Book from "./book.js";
import { displayBooks } from "./ui.js";

/**
 * Searches for books based on the input value and displays the results.
 * @param {HTMLElement} searchInput - The search input element
 * @returns {void}
 */
export function searchBooks(searchInput) {
  const searchedValue = searchInput.value.toLowerCase();
  const books = Book.listAllBooks();

  if (searchedValue.trim() === "") {
    displayBooks(); // display all books if search input is empty
    return;
  }

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchedValue) ||
      book.author.toLowerCase().includes(searchedValue)
  );

  if (filteredBooks.length === 0) {
    const booksContainer = document.getElementById("books-container");
    booksContainer.innerHTML =
      '<p class="text-center text-gray-500 col-span-full">No books found.</p>';
    return;
  }

  displayBooks(filteredBooks);
}
