# 📚 Book Library

A modern, interactive book management application built with vanilla JavaScript, featuring a clean UI and comprehensive book management capabilities.

## ✨ Features

### Core Functionality

- **Add Books**: Add new books with title, author, page count, and read status
- **View Library**: Browse your book collection in a responsive grid layout
- **Delete Books**: Remove books with confirmation modal
- **Toggle Read Status**: Mark books as read/unread with interactive status badges
- **Search Books**: Real-time search across titles and authors
- **Persistent Storage**: Books are stored locally in the browser

### User Experience

- **Toast Notifications**: Elegant notifications for user actions
- **Custom Modals**: Beautiful confirmation dialogs replacing browser alerts
- **Responsive Design**: Optimized for desktop and mobile devices
- **Keyboard Support**: Full keyboard navigation and Enter key submission
- **Smooth Animations**: Polished interactions with CSS transitions

### Technical Features

- **Modular Architecture**: Clean separation of concerns across multiple modules
- **ES6 Modules**: Modern JavaScript with import/export syntax
- **Private Class Fields**: Encapsulated data with proper access control
- **Tailwind CSS**: Utility-first CSS framework for consistent styling
- **Form Validation**: Client-side validation with helpful error messages

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/nanafox/book_library
   cd book_library
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Build CSS (development)**

   ```bash
   npm run build
   ```

   This starts Tailwind CSS in watch mode for development.

4. **Open the application**
   Open `index.html` in your browser or use a local server:

   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve .
   ```

## 🏗️ Project Structure

```
book_library/
├── index.html                 # Main HTML file
├── package.json              # Project configuration
├── README.md                 # This file
├── tailwind.config.js        # Tailwind CSS configuration
└── src/
    ├── input.css             # Tailwind input styles
    ├── output.css            # Generated CSS (built by Tailwind)
    └── js/                   # JavaScript modules
        ├── book.js           # Book class and data management
        ├── bookForm.js       # Form handling logic
        ├── deleteBook.js     # Book deletion functionality
        ├── modal.js          # Custom modal system
        ├── script.js         # Main application entry point
        ├── search.js         # Search functionality
        ├── toast.js          # Toast notification system
        ├── toggleStatus.js   # Read status toggle functionality
        └── ui.js             # UI rendering and display
```

## 📖 Usage Guide

### Adding a New Book

1. Click the **"Add Book"** button
2. Fill in the book details:
   - **Title**: Book title (required)
   - **Author**: Author name (required)
   - **Pages**: Number of pages (optional)
   - **Read Status**: Whether you've read the book
3. Click **"Add Book"** or press **Enter** to save

### Managing Your Library

- **Search**: Use the search box to find books by title or author
- **Toggle Status**: Click the status badge (✓ Read / 👁 Unread) to change read status
- **Delete Books**: Click the delete button (🗑️) and confirm in the modal

### Keyboard Shortcuts

- **Enter**: Submit the add book form
- **Escape**: Close modals and dialogs

## 🔧 Technical Details

### Architecture Overview

The application follows a modular architecture with clear separation of concerns:

#### Core Classes

**Book Class (`book.js`)**

- Manages the book data model with private static fields
- Handles CRUD operations (Create, Read, Update, Delete)
- Provides data validation and sanitization
- Maintains persistent storage

```javascript
// Example usage
const book = new Book("Title", "Author", 300, false);
Book.addBook(book);
const allBooks = Book.listAllBooks();
```

#### Modules

1. **UI Module (`ui.js`)**: Renders book cards and manages display
2. **Form Module (`bookForm.js`)**: Handles form submission and validation
3. **Search Module (`search.js`)**: Implements real-time search functionality
4. **Toast Module (`toast.js`)**: Shows user feedback notifications
5. **Modal Module (`modal.js`)**: Custom dialog system
6. **Delete Module (`deleteBook.js`)**: Book removal with confirmation
7. **Toggle Module (`toggleStatus.js`)**: Read status management

### Data Model

Each book contains:

- `id`: Unique identifier (UUID)
- `title`: Book title
- `author`: Author name
- `numOfPages`: Page count (optional)
- `isRead`: Read status (boolean)
- `createdAt`: Creation timestamp

### Storage

Books are stored as JSON in the browser's localStorage, ensuring persistence across sessions.

### Styling

The application uses Tailwind CSS for styling with:

- Responsive grid layouts
- Custom animations and transitions
- Consistent color scheme and typography
- Mobile-first design approach

## 🎨 Customization

### Modifying Styles

1. Edit `src/input.css` for custom CSS
2. Configure `tailwind.config.js` for Tailwind customization
3. Run `npm run build` to regenerate styles

### Adding Features

The modular architecture makes it easy to add new features:

1. Create a new module in `src/js/`
2. Import and initialize in `script.js`
3. Add any required HTML structure
4. Update styles as needed

### Sample Book Data

The application comes with 12 classic books pre-loaded for demonstration. You can modify the initial data in `book.js`.

## 🛠️ Development

### Scripts

- `npm run build`: Build CSS with Tailwind (watch mode)
- `npm test`: Run tests (not implemented yet)

### Code Style

- ES6+ JavaScript with modules
- Private class fields for encapsulation
- Consistent naming conventions
- Comprehensive error handling

## 🔮 Future Enhancements

Potential improvements and features:

- **Export/Import**: JSON export and import functionality
- **Categories**: Book categorization and filtering
- **Ratings**: Star rating system
- **Reading Progress**: Track reading progress percentage
- **Dark Mode**: Theme switching capability
- **Advanced Search**: Filter by read status, page count, etc.
- **Sort Options**: Multiple sorting criteria
- **Reading Stats**: Analytics and reading statistics
- **Book Cover Images**: Upload or fetch book covers
- **Reading Lists**: Create custom reading lists
- **Notes**: Add personal notes to books

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Maxwell Nana Forson

This project was created as part of The Odin Project curriculum.

## 🙏 Acknowledgments

- [The Odin Project](https://www.theodinproject.com/) for the project inspiration
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Google Fonts](https://fonts.google.com/) for the Inter font family

---

Happy Reading! 📚
