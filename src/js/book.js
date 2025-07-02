export default class Book {
  static #starterBooks = [
    {
      id: "b1e7e0c2-1f2a-4e3b-9c4d-8a1f2b3c4d5e",
      createdAt: new Date("2024-01-15T10:00:00Z"),
      updatedAt: new Date("2024-01-15T10:00:00Z"),
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isRead: true,
      numOfPages: 180,
    },
    {
      id: "a2d8f3b4-2c3d-4e5f-8b7a-9c0d1e2f3a4b",
      createdAt: new Date("2024-02-20T11:00:00Z"),
      updatedAt: new Date("2024-02-20T11:00:00Z"),
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isRead: false,
      numOfPages: 281,
    },
    {
      id: "c3f9e4d5-3b4c-5d6e-9a8b-0c1d2e3f4b5a",
      createdAt: new Date("2024-03-10T12:00:00Z"),
      updatedAt: new Date("2024-03-10T12:00:00Z"),
      title: "1984",
      author: "George Orwell",
      isRead: false,
      numOfPages: 328,
    },
    {
      id: "d4a8b5e6-4c5d-6e7f-0a9b-1c2d3e4f5a6b",
      createdAt: new Date("2024-04-15T14:30:00Z"),
      updatedAt: new Date("2024-04-15T14:30:00Z"),
      title: "Pride and Prejudice",
      author: "Jane Austen",
      isRead: true,
      numOfPages: 432,
    },
    {
      id: "e5b9c6f7-5d6e-7f8a-1b0c-2d3e4f5a6b7c",
      createdAt: new Date("2024-05-20T09:15:00Z"),
      updatedAt: new Date("2024-05-20T09:15:00Z"),
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      isRead: false,
      numOfPages: 277,
    },
    {
      id: "f6c0d7a8-6e7f-8a9b-2c1d-3e4f5a6b7c8d",
      createdAt: new Date("2024-06-10T16:45:00Z"),
      updatedAt: new Date("2024-06-10T16:45:00Z"),
      title: "Lord of the Flies",
      author: "William Golding",
      isRead: true,
      numOfPages: 224,
    },
    {
      id: "a7d1e8b9-7f8a-9b0c-3d2e-4f5a6b7c8d9e",
      createdAt: new Date("2024-07-05T11:20:00Z"),
      updatedAt: new Date("2024-07-05T11:20:00Z"),
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      isRead: true,
      numOfPages: 310,
    },
    {
      id: "b8e2f9c0-8a9b-0c1d-4e3f-5a6b7c8d9e0f",
      createdAt: new Date("2024-08-12T13:00:00Z"),
      updatedAt: new Date("2024-08-12T13:00:00Z"),
      title: "Brave New World",
      author: "Aldous Huxley",
      isRead: false,
      numOfPages: 268,
    },
    {
      id: "c9f3a0d1-9b0c-1d2e-5f4a-6b7c8d9e0f1a",
      createdAt: new Date("2024-09-03T08:30:00Z"),
      updatedAt: new Date("2024-09-03T08:30:00Z"),
      title: "The Picture of Dorian Gray",
      author: "Oscar Wilde",
      isRead: false,
      numOfPages: 254,
    },
    {
      id: "d0a4b1e2-0c1d-2e3f-6a5b-7c8d9e0f1a2b",
      createdAt: new Date("2024-10-18T15:10:00Z"),
      updatedAt: new Date("2024-10-18T15:10:00Z"),
      title: "Fahrenheit 451",
      author: "Ray Bradbury",
      isRead: true,
      numOfPages: 194,
    },
    {
      id: "e1b5c2f3-1d2e-3f4a-7b6c-8d9e0f1a2b3c",
      createdAt: new Date("2024-11-25T10:45:00Z"),
      updatedAt: new Date("2024-11-25T10:45:00Z"),
      title: "The Alchemist",
      author: "Paulo Coelho",
      isRead: true,
      numOfPages: 163,
    },
    {
      id: "f2c6d3a4-2e3f-4a5b-8c7d-9e0f1a2b3c4d",
      createdAt: new Date("2024-12-08T12:20:00Z"),
      updatedAt: new Date("2024-12-08T12:20:00Z"),
      title: "Animal Farm",
      author: "George Orwell",
      isRead: false,
      numOfPages: 112,
    },
  ];

  static #dirtyBooks = new Set(); // Track which books need saving
  static #STORAGE_VERSION = 1;
  static #saveTimeout = null;
  static #books;

  static prepareBooks() {
    try {
      const bookIds = JSON.parse(localStorage.getItem("book_ids") || "[]");
      const version = parseInt(localStorage.getItem("books_version") || "0");

      if (version === Book.#STORAGE_VERSION) {
        Book.#books = bookIds
          .map((id) => {
            const bookData = localStorage.getItem(`book_${id}`);
            return bookData ? JSON.parse(bookData, Book.#dateReviver) : null;
          })
          .filter(Boolean);
      } else {
        Book.#initializeFreshData();
      }
    } catch (error) {
      console.error("Error loading books:", error);
      Book.#initializeFreshData();
    }
  }

  static #initializeFreshData() {
    Book.#books = Book.#starterBooks.slice();
    Book.#saveAllBooks();
    localStorage.setItem("books_version", Book.#STORAGE_VERSION.toString());
  }

  static #saveAllBooks() {
    const bookIds = Book.#books.map((book) => book.id);
    localStorage.setItem("book_ids", JSON.stringify(bookIds));

    Book.#books.forEach((book) => {
      localStorage.setItem(`book_${book.id}`, JSON.stringify(book));
    });
  }

  static #dateReviver(key, value) {
    if ((key === "createdAt" || key === "updatedAt") && typeof value === "string") {
      return new Date(value);
    }
    return value;
  }

  static #saveBook(book) {
    if (Book.#saveTimeout) {
      clearTimeout(Book.#saveTimeout);
    }

    Book.#dirtyBooks.add(book.id);

    Book.#saveTimeout = setTimeout(() => {
      try {
        // Save only dirty books
        for (const bookId of Book.#dirtyBooks) {
          const book = Book.#books.find((b) => b.id === bookId);
          if (book) {
            localStorage.setItem(`book_${bookId}`, JSON.stringify(book));
          }
        }

        // Update book IDs list if needed
        const currentIds = Book.#books.map((b) => b.id);
        const storedIds = JSON.parse(localStorage.getItem("book_ids") || "[]");

        if (JSON.stringify(currentIds) !== JSON.stringify(storedIds)) {
          localStorage.setItem("book_ids", JSON.stringify(currentIds));
        }

        Book.#dirtyBooks.clear();
      } catch (error) {
        console.error("Failed to save books:", error);
      }
    }, 100);
  }

  static save() {
    if (Book.#books.length > 0) {
      Book.#saveBook(Book.#books[Book.#books.length - 1]);
    }
  }

  /**
   * Returns the list of available books in the system
   * @returns {Array<Object>} The list of available books
   */
  static listAllBooks() {
    if (!this.#books || this.#books.length === 0) {
      return [];
    }

    return [...this.#books].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  static addBook(title, author, isRead, numOfPages) {
    Book.validateParams(title, author, isRead, numOfPages);
    new Book(title, author, isRead, numOfPages);
  }

  /**
   * Creates a new Book instance
   * @param {string} title - The title of the book
   * @param {string} author - The author of the book
   * @param {boolean} isRead - Whether the book has been read
   * @param {number} numOfPages - The number of pages in the book
   */
  constructor(title, author, isRead, numOfPages) {
    Book.validateParams(title, author, isRead, numOfPages);

    const now = new Date();
    const newBook = {
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      title,
      author,
      isRead,
      numOfPages,
    };

    Object.assign(this, newBook);
    Book.#books.push(newBook);

    // Save the new book
    Book.#saveBook(newBook);
  }

  /**
   * Deletes a book by its ID
   * @param {string} id - The unique ID of the book to delete
   * @returns {Object} The deleted book object
   */
  static deleteBook(id) {
    if (typeof id !== "string" || id.trim() === "") {
      throw new Error("ID must be a non-empty string.");
    }

    const bookIndex = this.#books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new Error(`Book with ID "${id}" not found.`);
    }

    const deletedBook = this.#books[bookIndex];
    this.#books.splice(bookIndex, 1);

    // Remove from localStorage
    localStorage.removeItem(`book_${id}`);

    // Update book IDs list
    const bookIds = this.#books.map((book) => book.id);
    localStorage.setItem("book_ids", JSON.stringify(bookIds));

    return deletedBook;
  }

  static findBookById(id) {
    if (typeof id !== "string" || id.trim() === "") {
      throw new Error("ID must be a non-empty string.");
    }

    const book = this.#books.find((book) => book.id === id);
    if (!book) {
      throw new Error(`Book with ID "${id}" not found.`);
    }

    return book;
  }

  static findBookByTitle(title) {
    Book.#validateTitle(title);

    const book = this.#books.find((book) => book.title === title);
    if (!book) {
      throw new Error(`Book with title "${title}" not found.`);
    }

    return book;
  }

  static findBooksByAuthor(author) {
    Book.#validateAuthor(author);

    const books = this.#books.filter((book) => book.author === author);
    if (books.length === 0) {
      throw new Error(`No books found by author "${author}".`);
    }
    return books;
  }

  static validateParams(title, author, isRead, numOfPages) {
    Book.#validateTitle(title);
    Book.#validateAuthor(author);
    Book.#validateReadStatus(isRead);
    Book.#validateNumOfPages(numOfPages);
    Book.#validateUniqueAuthorAndTitle(title, author);
  }

  static #validateTitle(title) {
    if (typeof title !== "string" || title.trim() === "") {
      throw new Error("Title must be a non-empty string.");
    }
  }

  static #validateAuthor(author) {
    if (typeof author !== "string" || author.trim() === "") {
      throw new Error("Author must be a non-empty string.");
    }
  }

  static #validateReadStatus(isRead) {
    if (typeof isRead !== "boolean") {
      throw new Error("Read status must be a boolean.");
    }
  }

  static #validateNumOfPages(numOfPages) {
    if (typeof numOfPages !== "number" || numOfPages <= 0) {
      throw new Error("Number of pages must be a positive number.");
    }
  }

  static #validateUniqueAuthorAndTitle(title, author) {
    const exists = this.#books.some(
      (book) => book.title === title && book.author === author
    );
    if (exists) {
      throw new Error("A book with the same title and author already exists.");
    }
  }

  /**
   * Updates the read status of a book by its ID
   * @param {string} id - The unique ID of the book to update
   * @param {boolean} isRead - The new read status
   * @returns {Object} The updated book object
   */
  static updateReadStatus(id, isRead) {
    if (typeof id !== "string" || id.trim() === "") {
      throw new Error("ID must be a non-empty string.");
    }

    if (typeof isRead !== "boolean") {
      throw new Error("Read status must be a boolean.");
    }

    const book = Book.findBookById(id);
    book.isRead = isRead;
    book.updatedAt = new Date();

    // Save only this specific book
    Book.#saveBook(book);

    return book;
  }
}
