export default class Book {
  static #books = [
    {
      id: 'b1e7e0c2-1f2a-4e3b-9c4d-8a1f2b3c4d5e',
      createdAt: new Date('2022-01-01T10:00:00Z'),
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isRead: true,
      numOfPages: 180
    },
    {
      id: 'a2d8f3b4-2c3d-4e5f-8b7a-9c0d1e2f3a4b',
      createdAt: new Date('2022-02-01T11:00:00Z'),
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      isRead: false,
      numOfPages: 281
    },
    {
      id: 'c3f9e4d5-3b4c-5d6e-9a8b-0c1d2e3f4b5a',
      createdAt: new Date('2022-03-01T12:00:00Z'),
      title: '1984',
      author: 'George Orwell',
      isRead: false,
      numOfPages: 328
    }
  ];

  constructor(title, author, isRead, numOfPages) {
    Book.validateParams(title, author, isRead, numOfPages);

    this.id = crypto.randomUUID();
    this.createdAt = new Date();
    this.title = title;
    this.author = author;
    this.isRead = isRead;
    this.numOfPages = numOfPages;

    Book.#books.push({
      id: this.id,
      createdAt: this.createdAt,
      title: this.title,
      author: this.author,
      isRead: this.isRead,
      numOfPages: this.numOfPages
    });
  }

  static listAllBooks() {
    return this.#books;
  }

  static addBook(title, author, isRead, numOfPages) {
    Book.validateParams(title, author, isRead, numOfPages);
    new Book(title, author, isRead, numOfPages);
  }

  static findBookById(id) {
    if (typeof id !== 'string' || id.trim() === '') {
      throw new Error('ID must be a non-empty string.');
    }

    const book = this.#books.find(book => book.id === id);
    if (!book) {
      throw new Error(`Book with ID "${id}" not found.`);
    }

    return book;
  }

  static findBookByTitle(title) {
    Book.#validateTitle(title);

    const book = this.#books.find(book => book.title === title);
    if (!book) {
      throw new Error(`Book with title "${title}" not found.`);
    }

    return book;
  }

  static findBooksByAuthor(author) {
    Book.#validateAuthor(author);

    const books = this.#books.filter(book => book.author === author);
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
    if (typeof title !== 'string' || title.trim() === '') {
      throw new Error('Title must be a non-empty string.');
    }
  }

  static #validateAuthor(author) {
    if (typeof author !== 'string' || author.trim() === '') {
      throw new Error('Author must be a non-empty string.');
    }
  }

  static #validateReadStatus(isRead) {
    if (typeof isRead !== 'boolean') {
      throw new Error('Read status must be a boolean.');
    }
  }

  static #validateNumOfPages(numOfPages) {
    if (typeof numOfPages !== 'number' || numOfPages <= 0) {
      throw new Error('Number of pages must be a positive number.');
    }
  }

  static #validateUniqueAuthorAndTitle(title, author) {
    const exists = this.#books.some(
      book => book.title === title && book.author === author
    );
    if (exists) {
      throw new Error('A book with the same title and author already exists.');
    }
  }
}
