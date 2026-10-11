const defaultBooks = [
  { id: 1, title: "Wings of Fire", author: "A. P. J. Abdul Kalam", available: true },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho", available: true },
  { id: 3, title: "Atomic Habits", author: "James Clear", available: false },
  { id: 4, title: "Ponniyin Selvan", author: "Kalki Krishnamurthy", available: true },
  { id: 5, title: "The Guide", author: "R. K. Narayan", available: true },
  { id: 6, title: "Wings of the Fire", author: "Sample Author", available: true }
];

function loadBooks() {
  try {
    const saved = localStorage.getItem("smartLibraryBooks");
    return saved ? JSON.parse(saved) : defaultBooks.map(book => ({ ...book }));
  } catch {
    return defaultBooks.map(book => ({ ...book }));
  }
}

let books = loadBooks();

function saveBooks() {
  localStorage.setItem("smartLibraryBooks", JSON.stringify(books));
}

function showMessage(text) {
  const message = document.getElementById("message");
  if (message) message.textContent = text;
}

function renderBooks() {
  const list = document.getElementById("bookList");
  const search = document.getElementById("search");

  if (!list) return;

  const query = search ? search.value.trim().toLowerCase() : "";

  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(query) ||
    book.author.toLowerCase().includes(query)
  );

  list.replaceChildren();

  if (filtered.length === 0) {
    list.textContent = "No books found. Try another search.";
    return;
  }

  filtered.forEach(book => {
    const card = document.createElement("article");
    card.className = "book";

    const cover = document.createElement("div");
    cover.className = "book-cover";
    cover.textContent = "📖";
    cover.setAttribute("aria-hidden", "true");

    const title = document.createElement("h3");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = "Author: " + book.author;

    const status = document.createElement("p");
    status.textContent = book.available
      ? "Status: Available"
      : "Status: Borrowed";

    const button = document.createElement("button");
    button.textContent = book.available ? "Borrow Book" : "Return Book";

    button.addEventListener("click", () => {
      book.available = !book.available;
      saveBooks();
      showMessage(book.available
        ? "Book returned successfully!"
        : "Book borrowed successfully!");
      renderBooks();
    });

    card.append(cover, title, author, status, button);
    list.appendChild(card);
  });
}

const searchInput = document.getElementById("search");
if (searchInput) {
  searchInput.addEventListener("input", renderBooks);
}

const welcome = document.getElementById("welcome");
const demoUser = sessionStorage.getItem("libraryDemoUser");
if (welcome && demoUser) {
  welcome.textContent = "Welcome, " + demoUser + "! Find your next favourite book.";
}

renderBooks();
